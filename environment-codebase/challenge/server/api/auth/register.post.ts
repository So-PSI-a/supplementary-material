import { eq } from 'drizzle-orm';
import { z } from 'zod';

const bodySchema = z.object({
    name: z.string().min(4),
    email: z.email().min(1),
    password: z.string().min(6),
});

/**
 * Route to register a new user with name, email and password.
 *
 * On success, this route creates the user in the database but
 * does not log them in.
 */
export default defineEventHandler(async (event) => {
    const { name, email, password } = await readValidatedBody(
        event,
        bodySchema.parseAsync,
    );

    const existingUser = await db.query.users.findFirst({
        where: eq(schema.users.email, email),
    });

    if (existingUser) {
        // This is really bad for privacy, but the original app did it this way...
        // (Why is this not one of the "privacy-problems"?)
        throw createError({ status: 409, message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    await db.insert(schema.users).values({
        name,
        email,
        password: hashedPassword,
    });

    return {};
});
