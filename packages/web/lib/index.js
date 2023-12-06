import { join } from 'node:path'

function resolveWebRoot() {
  return join(__dirname, '..', 'dist')
}

export default resolveWebRoot
