import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: resolve(__dirname),
    globals: true,
    environment: 'node',
  },
})
