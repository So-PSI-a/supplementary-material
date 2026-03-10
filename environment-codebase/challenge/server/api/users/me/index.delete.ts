import { eq } from 'drizzle-orm';

/**
 * Deletes the currently authenticated user.
 *
 * Of course the user has to be authenticated to access this endpoint.
 *
 * If problems are disabled for this user, related sensitive data
 * such as payment methods and addresses are also deleted.
 */
export default defineEventHandler(async (event) => {
    const { user, problemsDisabled } = await requireUserSession(event);

    await db
        .update(schema.users)
        .set({ name: `Deleted user${user.id}`, isDeleted: true })
        .where(eq(schema.users.id, user.id));

    // Remove related data if problems are disabled
    if (problemsDisabled) {
        await db
            .delete(schema.userPaymentMethods)
            .where(eq(schema.userPaymentMethods.userId, user.id));

        await db
            .delete(schema.userAddresses)
            .where(eq(schema.userAddresses.userId, user.id));

        await db
            .delete(schema.ratings)
            .where(eq(schema.ratings.userId, user.id));
    }

    // Clear the user session after deleting the account
    await clearUserSession(event);

    return sendNoContent(event);
});
