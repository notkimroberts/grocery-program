export type RetrieveHandlerOptions = {
    fetch?: typeof fetch
    cache?: Boolean
    key?: PropertyKey
    cacheTime?: number
    baseUrl?: string
} & Omit<RequestInit, 'cache'>
