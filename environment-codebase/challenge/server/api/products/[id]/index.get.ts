import z from 'zod';

const routerParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

/**
 * Route to get a single product by its id.
 * If the product is not found, a 404 error is returned.
 */
export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(
        event,
        routerParamsSchema.parseAsync,
    );

    const product = await db.query.products.findFirst({
        where: (products, { eq }) => eq(products.id, id),
        with: { frames: true },
    });

    if (!product) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Product not found',
        });
    }

    return product;
});
