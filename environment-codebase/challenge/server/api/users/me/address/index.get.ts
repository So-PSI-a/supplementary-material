import { eq } from 'drizzle-orm';

/**
 * Get the address of the currently authenticated user.
 *
 * If the user has no address, a 404 error is returned.
 * Of course the user has to be authenticated to access this endpoint.
 */
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const address = await db.query.userAddresses.findFirst({
        where: (address) => eq(address.userId, user.id),
    });

    if (!address) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Address not found',
        });
    }

    return address;
});
