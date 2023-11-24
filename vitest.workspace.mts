import { URL, fileURLToPath } from 'node:url'
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/*',
  {
    test: {
      globals: true,
      name: 'savescum',
      environment: 'node',
      setupFiles: fileURLToPath(
        new URL(
          './packages/savescum/src/__tests__/vitest.setup.ts',
          import.meta.url
        )
      ),
    },
  },
  {
    test: {
      globals: true,
      name: '@savescum/web',
      environment: 'node',
      setupFiles: fileURLToPath(
        new URL('./packages/web/src/__tests__/vitest.setup.ts', import.meta.url)
      ),
    },
  },
])
