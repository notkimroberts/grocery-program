// TODO: Use env variable to determine host
export function newUrl(path: string) {
    return new URL(path, 'http://localhost:5173')
}
