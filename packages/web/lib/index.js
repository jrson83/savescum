import { join } from 'node:path'
import { dirname as pathDirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = pathDirname(fileURLToPath(import.meta.url))

function resolveWebRoot() {
  return join(__dirname, '..', 'dist')
}

export default resolveWebRoot
