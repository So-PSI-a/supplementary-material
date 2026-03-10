import z from 'zod';

const bodySchema = z.object({
    items: z
        .array(
            z.object({
                productId: z.int().positive(),
                frameId: z.int().positive(),
                quantity: z.int().positive().min(1),
            }),
        )
        .min(1),
});

/**
 * Endpoint to create a new order.
 * If successful, returns 204 no content, if malformed data is
 * provided, returns 400 bad request.
 *
 * Additionally, this endpoint requires the user to have a payment method
 * and a shipping address set up. If not, it returns 400 bad request.
 *
 * This requires the user to be authenticated.
 */
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);
    const { items } = await readValidatedBody(event, bodySchema.parseAsync);

    // Check if the user has a payment method and a shipping address
    const userInfo = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, user.id),
        with: {
            paymentMethod: true,
            address: true,
        },
    });

    if (!userInfo?.paymentMethod) {
        throw createError({
            status: 400,
            message: 'User has no payment method connected.',
        });
    }

    if (!userInfo?.address) {
        throw createError({
            status: 400,
            message: 'User has no shipping address.',
        });
    }

    // Check if all (productId, frameId) combinations are unique
    const productIdFrameIdCombinations = new Set<string>();

    for (const item of items) {
        const key = `${item.productId}/${item.frameId}`;

        if (productIdFrameIdCombinations.has(key)) {
            throw createError({
                status: 400,
                message: `Duplicate productId ${item.productId} and frameId ${item.frameId} combinations are not allowed.`,
            });
        }

        productIdFrameIdCombinations.add(key);
    }

    // Check if all productIds exist
    const products = await db.query.products.findMany({
        where: (products, { inArray }) =>
            inArray(
                products.id,
                items.map((item) => item.productId),
            ),
        with: {
            frames: true,
        },
    });

    if (products.length !== items.length) {
        throw createError({
            status: 400,
            message: 'Invalid product ids provided.',
        });
    }

    // Check if all (productId, frameId) combinations are valid
    for (const item of items) {
        const product = products.find(
            (product) => product.id === item.productId,
        );
        const frameExists = product?.frames.some(
            ({ id }) => id === item.frameId,
        );

        if (!frameExists) {
            throw createError({
                status: 400,
                message: `Invalid frame id ${item.frameId} for product id ${item.productId}.`,
            });
        }
    }

    // Create the order now
    await db.transaction(async (tx) => {
        const [order] = await tx
            .insert(schema.orders)
            .values({
                date: new Date(),
                userId: user.id,
            })
            .returning();

        await tx.insert(schema.orderItems).values(
            items.map((item) => ({
                orderId: order.id,
                productId: item.productId,
                frameId: item.frameId,
                quantity: item.quantity,
            })),
        );

        return order;
    });

    return sendNoContent(event);
});
