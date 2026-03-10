import { relations } from 'drizzle-orm';
import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { orders } from './orders';
import { ratings } from './ratings';
import { userAddresses } from './userAddresses';
import { userPaymentMethods } from './userPaymentMethods';

/**
 * Users of the application.
 */
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    isDeleted: boolean('is_deleted').notNull().default(false),
});

export const usersRelations = relations(users, ({ many, one }) => ({
    ratings: many(ratings),
    orders: many(orders),
    address: one(userAddresses),
    paymentMethod: one(userPaymentMethods),
}));
