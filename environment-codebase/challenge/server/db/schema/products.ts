import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { productFrames } from './productFrames';
import { ratings } from './ratings';

/**
 * Products that can be "purchased".
 */
export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text().notNull(),
    image: text().notNull(),
    description: text().notNull(),
    price: integer().notNull(),
});

export const productsRelations = relations(products, ({ many }) => ({
    frames: many(productFrames),
    ratings: many(ratings),
}));
