import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['**/*.tsx'],
            exclude: [
                '**/node_modules/**',
                '**/*.test.tsx',
                '**/*.spec.tsx',
                'src/__tests__/setup.ts',
            ],
        },
    },
})
