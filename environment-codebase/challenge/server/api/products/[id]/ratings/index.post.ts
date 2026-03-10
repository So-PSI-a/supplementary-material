import z from 'zod';

const routerParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

const bodySchema = z.object({
    content: z.string().min(1).max(1_000),
    rating: z.number().min(1).max(5),
});

/**
 * Route to create a new rating for a product by its id.
 * The user must be logged in to create a rating.
 *
 * If the product does not exist, a 404 error is returned.
 *
 * Otherwise, a new rating is created and a 204 No Content response is returned.
 */
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const { id } = await getValidatedRouterParams(
        event,
        routerParamsSchema.parseAsync,
    );
    const { content, rating } = await readValidatedBody(
        event,
        bodySchema.parseAsync,
    );

    // Check if product exists
    const product = await db.query.products.findFirst({
        where: (products, { eq }) => eq(products.id, id),
    });

    if (!product) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Product not found',
        });
    }

    // Create new rating
    await db.insert(schema.ratings).values({
        productId: id,
        userId: user.id,
        content,
        rating,
    });

    return sendNoContent(event);
});
