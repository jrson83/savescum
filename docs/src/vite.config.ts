import { defineConfig, searchForWorkspaceRoot } from 'vite'

console.log('DEBUG: ', searchForWorkspaceRoot(process.cwd()))

export default defineConfig({
  optimizeDeps: {
    // vitepress is aliased with replacement `join(DIST_CLIENT_PATH, '/index')`
    // This needs to be excluded from optimization
    exclude: ['vitepress'],
  },
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
    host: '127.0.0.1',
  },
})
