/**
 * Route to get the main product that will be displayed
 * on the page hero.
 *
 * This is hard-coded to be the 'stoned piranha' product,
 * but still a dynamic route for consistency.
 *
 * If the product is not found, a 404 error is returned.
 */
export default defineEventHandler(async () => {
    const product = await db.query.products.findFirst({
        where: (products, { eq }) => eq(products.name, 'Stone(d) Piranha'),
        with: { frames: true },
    });

    if (!product) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Hero product not found',
        });
    }

    return {
        ...product,
        frames: product.frames.map((frame) => frame.name),
    };
});
