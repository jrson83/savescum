import { resolve } from 'path'
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/*',
  {
    test: {
      globals: true,
      //include: ['src/__tests__/*.test.ts'],
      name: 'savescum',
      environment: 'node',
      setupFiles: resolve(
        __dirname,
        './packages/savescum/src/__tests__/vitest.setup.ts'
      ),
    },
  },
  {
    test: {
      globals: true,
      //include: ['src/__tests__/*.test.ts'],
      name: 'web',
      environment: 'node',
      setupFiles: resolve(
        __dirname,
        './packages/web/src/__tests__/vitest.setup.ts'
      ),
    },
  },
])
