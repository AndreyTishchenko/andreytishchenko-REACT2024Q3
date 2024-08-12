import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/rs-react/',
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            exclude: ['src/main.tsx/**'],
        },
    },
})
