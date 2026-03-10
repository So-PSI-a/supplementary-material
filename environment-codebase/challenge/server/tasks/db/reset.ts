/**
 * Task to reset the entire application by deleting all users and products.
 *
 * This will cascade and delete all related data such as orders, order items,
 * order deliveries, and product frames.
 *
 * This is run automatically at reset times.
 */
export default defineTask({
    meta: {
        description: 'Reset the entire application.',
    },
    async run() {
        // Remove all users (cascades to orders, orderItems, orderDeliveries, etc.)
        await db.delete(schema.users);

        // Remove all products (cascades to frames)
        await db.delete(schema.products);

        return { result: 'Reset completed.' };
    },
});
