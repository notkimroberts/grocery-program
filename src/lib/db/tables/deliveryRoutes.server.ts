import { pgTable, bigint, integer } from 'drizzle-orm/pg-core'

export const deliveryRoutes = pgTable('deliveryRoutes', {
    id: bigint('id', { mode: 'number' }).primaryKey(),
    routeNumber: integer('route_number').notNull().unique(),
})
