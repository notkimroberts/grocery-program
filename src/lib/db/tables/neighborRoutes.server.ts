import { pgTable, bigint } from 'drizzle-orm/pg-core'
import { deliveryRoutes } from './deliveryRoutes.server'
import { neighbors } from './neighbors.server'

export const neighborRoutes = pgTable('neighborRoutes', {
    id: bigint('id', { mode: 'number' }).primaryKey(),
    neighborId: bigint('neighborId', { mode: 'number' }).references(() => neighbors.id),
    routeId: bigint('routeId', { mode: 'number' }).references(() => deliveryRoutes.id),
})
