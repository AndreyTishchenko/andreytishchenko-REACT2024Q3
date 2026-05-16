import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'vite.config.ts',
        'vitest.config.ts',
        'src/main.tsx',
        'src/types.ts',
        'src/data/**'
      ]
    }
  }
})
