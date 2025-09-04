import { cache as store } from '$lib/general/state'
import type { RetrieveHandlerOptions } from '$lib/general/types'
import { parseBody, verifyFetchStatus } from '$lib/general/utils'

export function retrieve<T>({
    fetch = globalThis.fetch,
    cache = false,
    key = '',
    cacheTime = 0,
    baseUrl,
    ...fetchOptions
}: RetrieveHandlerOptions = {}) {
    return async (resource: URL | string, options: RequestInit = {}): Promise<T> => {
        if (resource instanceof URL) {
            resource = resource.toString()
        }
        if (baseUrl) {
            resource = `${baseUrl}${resource}`
        }
        key ||= resource
        if (key === resource && options?.body) {
            key += `:${options.body}`
        }
        if (typeof window === 'undefined' && !cache) {
            key = Symbol(String(key))
        }
        if (store.has(key)) {
            return store.get(key)
        }
        return await store.set(
            key,
            fetch(resource, { ...options, ...fetchOptions })
                .then(verifyFetchStatus)
                .then(parseBody)
                .then((res) => {
                    store.expire(key, cacheTime)
                    return res
                })
                .catch((e) => {
                    store.delete(key)
                    throw e
                }),
        )
    }
}
