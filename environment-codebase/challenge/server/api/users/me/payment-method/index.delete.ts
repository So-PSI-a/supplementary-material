import { eq } from 'drizzle-orm';

/**
 * Removes the payment method of the currently authenticated user.
 * Returns 204 No Content on success.
 *
 * Of course the user has to be authenticated to access this endpoint.
 */
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    await db
        .delete(schema.userPaymentMethods)
        .where(eq(schema.userPaymentMethods.userId, user.id));

    return sendNoContent(event);
});
