import { eq } from 'drizzle-orm';

/**
 * Get the payment method of the currently authenticated user.
 *
 * If the user has no payment method, a 404 error is returned.
 * Of course the user has to be authenticated to access this endpoint.
 */
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const paymentMethod = await db.query.userPaymentMethods.findFirst({
        where: (paymentMethod) => eq(paymentMethod.userId, user.id),
    });

    if (!paymentMethod) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Payment method not found',
        });
    }

    return paymentMethod;
});
