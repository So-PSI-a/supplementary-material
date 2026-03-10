import { relations } from 'drizzle-orm';
import { index, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { products } from './products';
import { users } from './users';

/**
 * Ratings given by users to products.
 */
export const ratings = pgTable(
    'ratings',
    {
        id: serial('id').primaryKey(),
        productId: integer('product_id')
            .notNull()
            .references(() => products.id, { onDelete: 'cascade' }),
        userId: integer('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        rating: integer().notNull(),
        content: text().notNull(),
    },
    (table) => [index().on(table.productId)],
);

export const ratingsRelations = relations(ratings, ({ one }) => ({
    product: one(products, {
        fields: [ratings.productId],
        references: [products.id],
    }),
    user: one(users, {
        fields: [ratings.userId],
        references: [users.id],
    }),
}));
