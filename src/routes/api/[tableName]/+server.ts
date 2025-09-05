import { json, type RequestHandler } from '@sveltejs/kit'
import { eq, asc, desc, and, SQL, type InferInsertModel } from 'drizzle-orm'
import { TABLES } from '$lib/db/constants'
import { getDb, getTable } from '$lib/db/server'

const db = getDb()

export const POST: RequestHandler = async ({ params, request }) => {
    try {
        const tableName = params.tableName
        if (!tableName || !(tableName in TABLES)) {
            return new Response('Invalid table', { status: 400 })
        }
        const { table } = getTable(params.tableName as keyof typeof TABLES)
        const body: InferInsertModel<typeof table> = await request.json()
        const [created] = await db.insert(table).values(body).returning()
        return new Response(JSON.stringify(created), { status: 201 })
    } catch (err) {
        return new Response(JSON.stringify({ error: (err as Error).message }), { status: 400 })
    }
}

export const GET: RequestHandler = async ({ params, url }) => {
    try {
        const tableName = params.tableName
        if (!tableName || !(tableName in TABLES)) {
            return new Response('Invalid table', { status: 400 })
        }
        const { table } = getTable(params.tableName as keyof typeof TABLES)
        const limit = Number(url.searchParams.get('limit') ?? 50)
        const offset = Number(url.searchParams.get('offset') ?? 0)
        const filters: SQL[] = []
        for (const [key, value] of url.searchParams.entries()) {
            if (['limit', 'offset', 'orderBy', 'direction'].includes(key)) {
                continue
            }
            if (key in table) {
                filters.push(eq((table as any)[key], value))
            }
        }
        const orderBy = url.searchParams.get('orderBy')
        const direction = url.searchParams.get('direction') ?? 'asc'
        const query = db.select().from(table)

        if (filters.length > 0) {
            query.where(and(...filters))
        }
        if (orderBy && orderBy in table) {
            query.orderBy(
                direction === 'desc' ? desc((table as any)[orderBy]) : asc((table as any)[orderBy]),
            )
        }
        const rows = await query.limit(limit).offset(offset)
        return json(rows)
    } catch (err) {
        return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 })
    }
}
