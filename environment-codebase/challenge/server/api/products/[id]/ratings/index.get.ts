import z from 'zod';

const routerParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

/**
 * Route to get ratings for a single product by its id.
 * If the product does not exist, an empty array is returned.
 */
export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(
        event,
        routerParamsSchema.parseAsync,
    );

    const ratings = await db.query.ratings.findMany({
        where: (ratings, { eq }) => eq(ratings.productId, id),
        with: { user: true },
    });

    return ratings.map(({ user, rating, content }) => ({
        userId: user.id,
        userName: user.name,
        rating,
        content,
    }));
});
