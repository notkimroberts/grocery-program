import { neon } from '@neondatabase/serverless'
import debug from 'debug'
import { drizzle as drizzleNeon, NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { drizzle as drizzlePostgresJs, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import * as schema from '../tables'

type DB = NeonHttpDatabase<typeof schema> | PostgresJsDatabase<typeof schema>

const log = debug('grocery-program:getDb')
const { DATABASE_LOG, DATABASE_URL } = process.env

if (!DATABASE_URL) {
    throw Error('DATABASE_URL is not defined in .env')
}

log(`connected to ${DATABASE_URL}`)

let db: DB
const isLocal = DATABASE_URL.includes('localhost')
if (isLocal) {
    db = drizzlePostgresJs({
        connection: {
            url: DATABASE_URL,
        },
        schema,
        logger: DATABASE_LOG === 'true',
    })
} else {
    const sql = neon(DATABASE_URL)
    db = drizzleNeon(sql, { schema })
}

export function getDb() {
    return db
}
