import { pgTable, serial, bigint, text, integer, date, boolean } from 'drizzle-orm/pg-core'

// Neighbors table
export const neighbors = pgTable('neighbors', {
    id: bigint('id', { mode: 'number' }).primaryKey().defaultRandom(), // serial alternative
    name: text('name').notNull(),
    phone: text('phone'),
    address: text('address'),
    nationality: text('nationality'),
})

// Delivery routes
export const deliveryRoutes = pgTable('delivery_routes', {
    id: bigint('id', { mode: 'number' }).primaryKey().defaultRandom(),
    routeNumber: integer('route_number').notNull().unique(),
})

// Neighbor routes (junction table)
export const neighborRoutes = pgTable('neighbor_routes', {
    id: bigint('id', { mode: 'number' }).primaryKey().defaultRandom(),
    neighborId: bigint('neighbor_id', { mode: 'number' }).references(() => neighbors.id),
    routeId: bigint('route_id', { mode: 'number' }).references(() => deliveryRoutes.id),
})

// Grocery deliveries
export const groceryDeliveries = pgTable('grocery_deliveries', {
    id: bigint('id', { mode: 'number' }).primaryKey().defaultRandom(),
    neighborId: bigint('neighbor_id', { mode: 'number' }).references(() => neighbors.id),
    deliveryDate: date('delivery_date').notNull(),
    received: boolean('received').notNull(),
})

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    age: integer('age'),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
})

export const session = pgTable('session', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
})

export type Session = typeof session.$inferSelect

export type User = typeof user.$inferSelect
