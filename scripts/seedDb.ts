import debug from 'debug'
import { seed } from 'drizzle-seed'
import { getDb } from '../src/lib/db/server'
import { neighbors } from '../src/lib/db/tables'

const log = debug('grocery-program:seedDb')

async function seedDb() {
    try {
        log('seeding database...')
        const db = getDb()
        log('got db...')
        await seed(db, { neighbors }, { count: 1 }).refine((funcs) => ({
            neighbors: {
                count: 20,
                columns: {
                    firstName: funcs.firstName(),
                    lastName: funcs.lastName(),
                    phone: funcs.phoneNumber({ template: '(###) ###-####' }),
                    metadata: funcs.json(),
                },
            },
        }))
        log('seeding finished...')
    } catch (error) {
        log(error)
        process.exit(1)
    }
    process.exit(0)
}

seedDb()
