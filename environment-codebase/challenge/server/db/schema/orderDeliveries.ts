import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { orders } from './orders';

/**
 * A delivery for an order.
 */
export const orderDeliveries = pgTable('order_deliveries', {
    orderId: uuid('order_id')
        .references(() => orders.id, { onDelete: 'cascade' })
        .primaryKey(),
    date: timestamp('date', { withTimezone: true }).notNull(),
    service: text('service').notNull(),
    to: text('to').notNull(),
});

export const orderDeliveriesRelations = relations(
    orderDeliveries,
    ({ one }) => ({
        order: one(orders, {
            fields: [orderDeliveries.orderId],
            references: [orders.id],
        }),
    }),
);
