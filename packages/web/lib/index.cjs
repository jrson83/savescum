const { join } = require('node:path')

function resolveWebRoot() {
  console.log('process.cwd():', process.cwd())
  console.log('__dirname:', __dirname)
  console.log('__filename:', __filename)
  console.log('process.mainModule:', require.main)
  console.log(join(__dirname, '..', 'dist'))
  return join(__dirname, '..', 'dist')
}

module.exports = resolveWebRoot
