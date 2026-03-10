/**
 * A middleware that checks if the user is authenticated.
 * If not authenticated, redirects to the login page.
 */
export default defineNuxtRouteMiddleware(async () => {
    const { loggedIn } = useUserSession();

    if (!loggedIn.value) {
        return await navigateTo('/login');
    }
});
