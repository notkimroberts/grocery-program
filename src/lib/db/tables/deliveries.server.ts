import { pgTable, bigint, date, boolean } from 'drizzle-orm/pg-core'
import { neighbors } from './neighbors.server'

export const deliveries = pgTable('deliveries', {
    id: bigint('id', { mode: 'number' }).primaryKey(),
    neighborId: bigint('neighbor_id', { mode: 'number' }).references(() => neighbors.id),
    programDate: date('programDate').notNull(),
    received: boolean('received').notNull(),
})
