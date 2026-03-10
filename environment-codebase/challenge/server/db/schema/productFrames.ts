import { relations } from 'drizzle-orm';
import {
    integer,
    pgTable,
    serial,
    text,
    uniqueIndex,
} from 'drizzle-orm/pg-core';
import { products } from './products';

/**
 * A frame that is available for a product.
 */
export const productFrames = pgTable(
    'product_frames',
    {
        id: serial('id').primaryKey(),
        productId: integer('product_id')
            .notNull()
            .references(() => products.id, { onDelete: 'cascade' }),
        name: text('name').notNull(),
    },
    (table) => [uniqueIndex().on(table.productId, table.name)],
);

export const productFramesRelations = relations(productFrames, ({ one }) => ({
    product: one(products, {
        fields: [productFrames.productId],
        references: [products.id],
    }),
}));
