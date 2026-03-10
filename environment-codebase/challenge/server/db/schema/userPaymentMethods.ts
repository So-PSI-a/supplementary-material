import { relations } from 'drizzle-orm';
import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { users } from './users';

/**
 * Payment methods associated with users.
 */
export const userPaymentMethods = pgTable('user_payment_methods', {
    userId: integer('user_id')
        .primaryKey()
        .references(() => users.id, { onDelete: 'cascade' }),
    cardNumber: text('card_number').notNull(),
    cardOwner: text('card_owner').notNull(),
    validUntil: date('valid_until').notNull(),
    cvc: integer('cvc').notNull(),
});

export const userPaymentMethodsRelations = relations(
    userPaymentMethods,
    ({ one }) => ({
        user: one(users, {
            fields: [userPaymentMethods.userId],
            references: [users.id],
        }),
    }),
);
