import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { orders } from './orders';
import { productFrames } from './productFrames';
import { products } from './products';

/**
 * An item in an order.
 */
export const orderItems = pgTable(
    'order_items',
    {
        orderId: uuid('order_id')
            .notNull()
            .references(() => orders.id, { onDelete: 'cascade' }),
        productId: integer('product_id')
            .notNull()
            .references(() => products.id, {
                onDelete: 'restrict',
            }),
        frameId: integer('frame_id')
            .notNull()
            .references(() => productFrames.id, {
                onDelete: 'restrict',
            }),
        quantity: integer('quantity').notNull(),
    },
    (table) => [
        primaryKey({
            columns: [table.orderId, table.productId, table.frameId],
        }),
    ],
);

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    product: one(products, {
        fields: [orderItems.productId],
        references: [products.id],
    }),
    frame: one(productFrames, {
        fields: [orderItems.frameId],
        references: [productFrames.id],
    }),
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
}));
