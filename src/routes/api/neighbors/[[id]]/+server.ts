import { handleRequest } from '$lib/db/server'
import { neighbors } from '$lib/db/tables'

export const fallback = handleRequest(neighbors)
