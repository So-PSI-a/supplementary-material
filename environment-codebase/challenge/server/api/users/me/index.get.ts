import { eq } from 'drizzle-orm';

/**
 * Gets the currently authenticated user.
 *
 * The user has to be authenticated to access this endpoint.
 */
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const userInfo = await db.query.users.findFirst({
        where: eq(schema.users.id, user.id),
    });

    return {
        id: userInfo!.id,
        name: userInfo!.name,
        email: userInfo!.email,
    };
});
