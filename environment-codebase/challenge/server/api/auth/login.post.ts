import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

const bodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

/**
 * Route to log in a user with email and password.
 *
 * On success, this route sets the session cookie.
 *
 * **WARNING:** If you are in development mode and using Safari, make sure
 * to open the site using `https`, as otherwise the _secure_ cookie won't be set!
 */
export default defineEventHandler(async (event) => {
    const { email, password } = await readValidatedBody(
        event,
        bodySchema.parseAsync,
    );

    const existingUser = await db.query.users.findFirst({
        where: and(
            eq(schema.users.email, email),
            eq(schema.users.isDeleted, false),
        ),
    });

    // No need to prevent timing attacks on email enumeration here,
    // as one could just use register for that... :(
    if (
        existingUser &&
        (await verifyPassword(existingUser.password, password))
    ) {
        // No rehashing here, as the site won't live long enough for that to matter
        await setUserSession(event, {
            user: {
                id: existingUser.id,
            },
            loggedInAt: Date.now(),
        });

        return sendNoContent(event);
    }

    throw createError({ status: 401, message: 'Bad credentials' });
});
