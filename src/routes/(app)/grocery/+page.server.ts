import { retrieveNeighbors } from '$lib/neighbors/utils'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({}) => {
    return {
        neighbors: await retrieveNeighbors(),
    }
}
