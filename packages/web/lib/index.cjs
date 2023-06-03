const { join } = require('node:path')

function resolveWebRoot() {
  return join(__dirname, '..', 'dist')
}

module.exports = resolveWebRoot
