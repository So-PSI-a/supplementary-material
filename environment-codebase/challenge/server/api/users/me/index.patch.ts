import { eq } from 'drizzle-orm';
import z from 'zod';

const bodySchema = z.object({
    name: z.string().min(4),
    email: z.email().min(1),
});

/**
 * Updates the name and email of the currently authenticated user.
 *
 * Of course the user has to be authenticated to access this endpoint.
 */
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);
    const { name, email } = await readValidatedBody(
        event,
        bodySchema.parseAsync,
    );

    const [updatedUser] = await db
        .update(schema.users)
        .set({ name, email })
        .where(eq(schema.users.id, user.id))
        .returning();

    // Update the user session with the new data
    await setUserSession(event, {
        user: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
        },
    });

    return sendNoContent(event);
});
