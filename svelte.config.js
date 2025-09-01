import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import debug from 'debug'

const log = debug('grocery-program:svelte-config')
log('loaded svelte-config')
const production = process.env.NODE_ENV === 'production'

const config = {
    compilerOptions: {
        experimental: {
            async: true,
        },
    },
    runes: true,
    preprocess: vitePreprocess(),
    kit: { adapter: adapter({ preprocess: true }) },
    preprocess: vitePreprocess({
        sourceMap: !production,
    }),
    warningFilter: (warning) =>
        !warning.filename?.includes('node_modules') && !warning.code.includes('a11y'),
}

export default config
