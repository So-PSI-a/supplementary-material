import { eq, isNull } from 'drizzle-orm';

const DELIVERY_SERVICES = ['DHL', 'UPS'] as const;
const DELIVERY_RECIPIENTS = ['Neighbor, John Doe', 'Customer'] as const;

/**
 * Task to "deliver" pending orders.
 *
 * This will find all undelivered orders and create corresponding
 * order delivery records.
 */
export default defineTask({
    meta: {
        description: 'Deliver pending orders.',
    },
    async run() {
        const pendingOrders = await db
            .select()
            .from(schema.orders)
            .leftJoin(
                schema.orderDeliveries,
                eq(schema.orders.id, schema.orderDeliveries.orderId),
            )
            .where(isNull(schema.orderDeliveries.orderId));

        for (const order of pendingOrders) {
            const service =
                DELIVERY_SERVICES[
                    Math.floor(Math.random() * DELIVERY_SERVICES.length)
                ];
            const to =
                DELIVERY_RECIPIENTS[
                    Math.floor(Math.random() * DELIVERY_RECIPIENTS.length)
                ];

            await db.insert(schema.orderDeliveries).values({
                orderId: order.orders.id,
                date: new Date(),
                service,
                to,
            });
        }

        return { result: `Delivered ${pendingOrders.length} orders.` };
    },
});
