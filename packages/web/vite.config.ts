import { resolve } from 'node:path'
import preact from '@preact/preset-vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
  },
  test: {
    include: ['./src/__tests__/*.test.ts'],
  },
})
