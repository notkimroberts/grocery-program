import { pgTable, bigint, text, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const neighbors = pgTable('neighbors', {
    id: bigint('id', { mode: 'number' }).primaryKey(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
    firstName: text('firstName').notNull(),
    lastName: text('lastName'),
    phone: text('phone'),
    metadata: jsonb(),
})
