import { neon } from '@neondatabase/serverless'
import debug from 'debug'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import { drizzle as drizzlePostgresJs } from 'drizzle-orm/postgres-js'
import * as schema from '../tables'

const log = debug('grocery-program:getDb')
const { DATABASE_LOG, DATABASE_URL } = process.env

if (!DATABASE_URL) {
    throw Error('DATABASE_URL is not defined in .env')
}

log(`connected to ${DATABASE_URL}`)

const isLocal = DATABASE_URL.includes('localhost')
const config = {
    connection: {
        url: DATABASE_URL,
    },
    schema,
    logger: DATABASE_LOG === 'true',
}

const sql = neon(DATABASE_URL)
const db = isLocal ? drizzlePostgresJs(config) : drizzleNeon(sql, { schema })

export function getDb() {
    return db
}
