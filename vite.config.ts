import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import debug from 'debug'
import { defineConfig } from 'vite'
import devtoolsJson from 'vite-plugin-devtools-json'

const log = debug('grocery-program:viteconfig')
log('loaded viteconfig')

const { NODE_ENV } = process.env

export default defineConfig({
    build: {
        sourcemap: NODE_ENV === 'production' ? false : true,
    },
    plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
    test: {
        expect: { requireAssertions: true },
        projects: [
            {
                extends: './vite.config.ts',
                test: {
                    name: 'client',
                    environment: 'browser',
                    browser: {
                        enabled: true,
                        provider: 'playwright',
                        instances: [{ browser: 'chromium' }],
                    },
                    include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
                    exclude: ['src/lib/server/**'],
                    setupFiles: ['./vitest-setup-client.ts'],
                },
            },
            {
                extends: './vite.config.ts',
                test: {
                    name: 'server',
                    environment: 'node',
                    include: ['src/**/*.{test,spec}.{js,ts}'],
                    exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
                },
            },
        ],
    },
})
