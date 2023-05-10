import { defineConfig } from 'ptsup'

export default defineConfig({
  entry: ['src/index.ts'],
  platform: 'node',
  format: ['cjs'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: {
    enable: false,
  },
  external: [],
  esbuild: {
    bundle: true,
    minify: true,
  },
})
