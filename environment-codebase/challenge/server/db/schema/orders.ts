import { relations } from 'drizzle-orm';
import { index, integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { orderDeliveries } from './orderDeliveries';
import { orderItems } from './orderItems';
import { users } from './users';

/**
 * An order placed for multiple items.
 */
export const orders = pgTable(
    'orders',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        date: timestamp('date', { withTimezone: true }).notNull(),
        userId: integer('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
    },
    (table) => [index().on(table.userId)],
);

export const ordersRelations = relations(orders, ({ one, many }) => ({
    delivery: one(orderDeliveries),
    items: many(orderItems),
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
}));
