import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  platform: 'node',
  format: ['esm'],
  target: 'node18',
  clean: true,
  dts: false,
  minify: true,
  splitting: false,
  sourcemap: false,
  external: ['@example@web', 'fastify-tsconfig'],
})
