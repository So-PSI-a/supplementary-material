import z from 'zod';

const bodySchema = z.object({
    fullName: z.string().min(1),
    addressLine1: z.string().min(1),
    addressLine2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().optional(),
    postalCode: z.number().positive().min(1000),
    country: z.string().min(1),
});

/**
 * Updates the address of the currently authenticated user.
 *
 * The endpoint returns a 204 No Content response on success.
 * Of course the user has to be authenticated to access this endpoint.
 */
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);
    const { fullName, addressLine1, addressLine2, city, postalCode, country } =
        await readValidatedBody(event, bodySchema.parseAsync);

    const newAddress = {
        userId: user.id,
        fullName,
        addressLine1,
        addressLine2: addressLine2 ?? null,
        city,
        postalCode,
        country,
    };

    await db
        .insert(schema.userAddresses)
        .values(newAddress)
        .onConflictDoUpdate({
            target: [schema.userAddresses.userId],
            set: newAddress,
        });

    return sendNoContent(event);
});
