/**
 * Parses the body of a Response object, automatically determining whether to parse as JSON or text
 * based on the 'content-type' header.
 * @param response The Response object to parse.
 * @returns The parsed body, either as a JSON object or as a string.
 */
export async function parseBody(response: Response) {
    const contentType = response.headers.get('content-type')
    const bodyParser =
        contentType?.startsWith('application') && contentType?.includes('json') ? 'json' : 'text'
    const body = await response[bodyParser]()
    return body
}
