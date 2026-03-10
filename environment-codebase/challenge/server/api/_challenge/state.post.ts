import z from 'zod';

const bodySchema = z.object({
    disable: z.boolean(),
});

/**
 * Endpoint to enable or disable the "problems" features for the current user.
 * This is stored in the user session but needs to be available on the server
 * side as some endpoints behave differently based on this state.
 *
 * Always returns a 204 No Content response.
 */
export default defineEventHandler(async (event) => {
    const { disable } = await readValidatedBody(event, bodySchema.parseAsync);

    await setUserSession(event, {
        problemsDisabled: disable,
    });

    return sendNoContent(event);
});
