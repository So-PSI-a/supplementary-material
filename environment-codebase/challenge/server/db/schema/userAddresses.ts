import { relations } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { users } from './users';

/**
 * Addresses associated with users.
 */
export const userAddresses = pgTable('user_addresses', {
    userId: integer('user_id')
        .primaryKey()
        .references(() => users.id, { onDelete: 'cascade' }),
    fullName: text('full_name').notNull(),
    addressLine1: text('address_line_1').notNull(),
    addressLine2: text('address_line_2'),
    city: text('city').notNull(),
    state: text('state'),
    postalCode: integer('postal_code').notNull(),
    country: text('country').notNull(),
});

export const userAddressesRelations = relations(userAddresses, ({ one }) => ({
    user: one(users, {
        fields: [userAddresses.userId],
        references: [users.id],
    }),
}));
