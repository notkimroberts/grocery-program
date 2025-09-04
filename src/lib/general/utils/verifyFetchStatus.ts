export async function verifyFetchStatus(res: Response) {
    if (!res.ok) {
        const text = await res.text()
        const resHeaders = new Headers(res.headers)
        if (
            resHeaders.get('content-type')?.startsWith('application') &&
            resHeaders.get('content-type')?.includes('json')
        ) {
            let json: Record<string, any> | undefined
            try {
                json = JSON.parse(text)
            } catch (e) {
                /* empty */
            }
            throw new Error(json?.error?.message ?? json?.error ?? json?.message ?? text)
        } else {
            throw new Error(text || res.statusText)
        }
    }
    return res
}
