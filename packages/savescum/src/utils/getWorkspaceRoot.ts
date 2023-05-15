import { fileExists } from './fileExists'
import { resolve } from 'node:path'

export async function getWorkspaceRoot() {
  const packagePath = resolve(
    __dirname,
    '..',
    'node_modules',
    '@savescum',
    'web',
    'dist',
    'index.html'
  )
  if (await fileExists(resolve(packagePath))) {
    return resolve(__dirname, '..', 'node_modules', '@savescum', 'web', 'dist')
  }
  return resolve(__dirname, '..', '..', '@savescum', 'web', 'dist')
}
