import z from 'zod';

const bodySchema = z.object({
    cardNumber: z.string().min(1),
    cardOwner: z.string().min(1),
    validUntil: z.coerce.date(),
    cvc: z.number().min(1),
});

/**
 * Updates the payment method of the currently authenticated user.
 *
 * The endpoint returns a 204 No Content response on success.
 * Of course the user has to be authenticated to access this endpoint.
 */
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);
    const { cardNumber, cardOwner, validUntil, cvc } = await readValidatedBody(
        event,
        bodySchema.parseAsync,
    );

    const newPaymentMethod = {
        userId: user.id,
        cardNumber,
        cardOwner,
        validUntil: validUntil.toDateString(),
        cvc,
    };

    await db
        .insert(schema.userPaymentMethods)
        .values(newPaymentMethod)
        .onConflictDoUpdate({
            target: [schema.userPaymentMethods.userId],
            set: newPaymentMethod,
        });

    return sendNoContent(event);
});
