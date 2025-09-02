import type { Neighbors } from '$lib/db/types'
import { newUrl } from '$lib/general/utils'

export async function retrieveNeighbors() {
    const url = newUrl('/api/neighbors')
    const res = await fetch(url)
    if (res.ok) {
        return (await res.json()) as Neighbors[]
    }
}
