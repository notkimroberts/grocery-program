import type { Neighbors } from '$lib/db/types'
import type { RetrieveHandlerOptions } from '$lib/general/types'
import { retrieve } from '$lib/general/utils/retrieve'

type NeighborsList = Neighbors[]

export async function retrieveNeighbors(options: RetrieveHandlerOptions = {}) {
    return await retrieve<NeighborsList>({ ...options })('/api/neighbors')
}
