class Cache {
    list: Record<PropertyKey, any> = {}
    set(key: PropertyKey, value: any, expire?: number) {
        if (!this.has(key)) {
            this.list[key] = value
            if (typeof expire === 'number') {
                this.expire(key, expire)
            }
        }
        return this.get(key)
    }
    has(key: PropertyKey) {
        return key in this.list
    }
    delete(key: PropertyKey) {
        if (this.has(key)) {
            delete this.list[key]
            return true
        }
        return false
    }
    get(key: PropertyKey) {
        return this.list[key]
    }
    expire(key: PropertyKey, timeout = 0) {
        setTimeout(() => this.delete(key), timeout)
    }
}

export const cache = new Cache()
