/**
 * Endpoint that exports the currently authenticated user's data.
 *
 * This requires the user to be authenticated.
 *
 * If problems are _NOT_ disabled for this user, the endpoint returns a 404 error,
 * as the data export is only available when problems are disabled.
 */
export default defineEventHandler(async (event) => {
    const { user, problemsDisabled } = await requireUserSession(event);

    if (!problemsDisabled) {
        throw createError({
            statusCode: 404,
        });
    }

    const storedUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, user.id),
        with: {
            address: true,
            paymentMethod: true,
            orders: {
                with: {
                    delivery: true,
                },
            },
            ratings: true,
        },
    });

    return {
        ...storedUser,
        orders: storedUser?.orders.map((order) => ({
            ...order,
            delivery: order.delivery
                ? {
                      ...order.delivery,
                      to: undefined,
                  }
                : null,
        })),
        password: undefined,
        isDeleted: undefined,
    };
});
