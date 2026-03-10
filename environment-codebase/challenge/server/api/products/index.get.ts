import z from 'zod';

const querySchema = z.object({
    limit: z.coerce.number().int().positive().optional(),
});

/**
 * Route to get a list of products, optionally limited
 * by the `limit` query parameter.
 */
export default defineEventHandler(async (event) => {
    const { limit } = await getValidatedQuery(event, querySchema.parseAsync);

    return await db.query.products.findMany({ limit, with: { frames: true } });
});
