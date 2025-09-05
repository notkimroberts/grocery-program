import { json, type RequestHandler } from '@sveltejs/kit'
import { eq, type InferSelectModel } from 'drizzle-orm'
import { TABLES } from '$lib/db/constants'
import { getDb, getTable } from '$lib/db/server'

const db = getDb()

export const GET: RequestHandler = async ({ params }) => {
    try {
        const tableName = params.tableName
        if (!tableName || !(tableName in TABLES)) {
            return new Response('Invalid table', { status: 400 })
        }
        const { table } = getTable(tableName as keyof typeof TABLES)
        type RowType = InferSelectModel<typeof table>
        const [row]: RowType[] = await db
            .select()
            .from(table)
            .where(eq((table as any).id, params.id))
        if (!row) {
            return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
        }
        return json(row)
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 })
    }
}

export const PUT: RequestHandler = async ({ params, request }) => {
    try {
        const tableName = params.tableName
        if (!tableName || !(tableName in TABLES)) {
            return new Response('Invalid table', { status: 400 })
        }
        const { table } = getTable(tableName as keyof typeof TABLES)
        const body = await request.json()
        const [updated] = await db
            .update(table)
            .set(body)
            .where(eq((table as any).id, params.id))
            .returning()
        if (!updated) {
            return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
        }
        return json(updated)
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400 })
    }
}

export const DELETE: RequestHandler = async ({ params }) => {
    try {
        const tableName = params.tableName
        if (!tableName || !(tableName in TABLES)) {
            return new Response('Invalid table', { status: 400 })
        }
        const { table } = getTable(tableName as keyof typeof TABLES)
        const [deleted] = await db
            .delete(table)
            .where(eq((table as any).id, params.id))
            .returning()
        if (!deleted) {
            return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
        }
        return json(deleted)
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 })
    }
}
