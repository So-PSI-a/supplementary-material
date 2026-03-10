/**
 * An endpoint to get all orders for the authenticated user.
 * The returned orders are sorted by date in descending order (most recent first).
 *
 * This requires the user to be authenticated.
 *
 * If problems are disabled for this user, sensitive delivery information
 * such as who accepted the delivery is omitted from the response.
 */
export default defineEventHandler(async (event) => {
    const { user, problemsDisabled } = await requireUserSession(event);

    const orders = await db.query.orders.findMany({
        where: (orders, { eq }) => eq(orders.userId, user.id),
        orderBy: (orders, { desc }) => [desc(orders.date)],
        with: {
            delivery: true,
            items: {
                with: {
                    frame: true,
                    product: true,
                },
            },
        },
    });

    return orders.map((order) => ({
        ...order,
        delivery: order.delivery
            ? {
                  ...order.delivery,
                  ...(problemsDisabled ? { to: undefined } : {}),
              }
            : null,
    }));
});
