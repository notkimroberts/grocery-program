import { TABLES } from '$lib/db/constants'

export function getTable<T extends keyof typeof TABLES>(name: T) {
    const table = TABLES[name]
    if (!table) {
        throw new Error(`Unknown table: ${name}`)
    }
    return {
        name,
        table,
    }
}
