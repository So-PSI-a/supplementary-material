import z from 'zod';

const routerParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

/**
 * Route to get a single user by its id.
 * If the user is not found, a 404 error is returned.
 *
 * If the user has disabled the "problems" features,
 * this endpoint will never return an email address.
 */
export default defineEventHandler(async (event) => {
    const { user: sessionUser, problemsDisabled } = await getUserSession(event);
    const { id } = await getValidatedRouterParams(
        event,
        routerParamsSchema.parseAsync,
    );

    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, id),
    });

    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found',
        });
    }

    // Only leak some data but not the password hash
    return {
        id: user.id,
        name: user.name,
        ...(problemsDisabled && user.id !== sessionUser?.id
            ? {}
            : { email: user.email }),
    };
});
