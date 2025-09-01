import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import 'dotenv/config'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    compilerOptions: {
        experimental: {
            async: true,
        },
    },
    preprocess: vitePreprocess(),
    kit: { adapter: adapter() },
}

export default config
