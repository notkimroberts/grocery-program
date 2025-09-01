import { pgTable, bigint, text, timestamp } from 'drizzle-orm/pg-core'

export const neighbors = pgTable('neighbors', {
    id: bigint('id', { mode: 'number' }).primaryKey(),
    name: text('name').notNull(),
    phone: text('phone'),
    address: text('address'),
    nationality: text('nationality'),
    createdAt: timestamp('createdAt', { withTimezone: true, mode: 'date' }).notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true, mode: 'date' }).notNull(),
})
