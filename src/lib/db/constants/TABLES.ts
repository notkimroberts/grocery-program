import type { AnyPgTable } from 'drizzle-orm/pg-core'
import * as schema from '$lib/db/tables'

export const TABLES = schema as Record<string, AnyPgTable>
