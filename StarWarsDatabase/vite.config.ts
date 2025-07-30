import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true, // Enables global functions like `test`, `expect`
        environment: 'jsdom', // Simulates browser-like environment
        setupFiles: './src/setupTests.ts', // Setup for RTL
        css: true, // Support for CSS imports
        coverage: {
            provider: 'v8', // Enables coverage using V8 engine
            reporter: ['text', 'json', 'html'], // Generate reports
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
