import { retrieveNeighbors } from '$lib/neighbors/utils'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
    return {
        neighbors: retrieveNeighbors({ fetch }),
    }
}
