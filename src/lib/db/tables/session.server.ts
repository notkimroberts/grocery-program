import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './user.server'

export const session = pgTable('session', {
    id: text('id').primaryKey(),
    userId: text('userId')
        .notNull()
        .references(() => user.id),
    expiresAt: timestamp('expiresAt', { withTimezone: true, mode: 'date' }).notNull(),
})
