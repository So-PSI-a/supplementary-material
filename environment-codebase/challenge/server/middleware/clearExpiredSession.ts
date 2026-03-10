/**
 * Middleware to clear expired user sessions.
 *
 * If the user's session `loggedInAt` timestamp is older than the last reset date,
 * the session is cleared.
 */
export default defineEventHandler(async (event) => {
    const { loggedInAt } = await getUserSession(event);

    if (loggedInAt) {
        const resetDate = getResetDate({ type: 'last' });

        if (loggedInAt < resetDate.getTime()) {
            await clearUserSession(event);
        }
    }
});
