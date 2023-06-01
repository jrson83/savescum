import { copyFile } from 'fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

const readmePath = resolve(cwd(), 'README.md')
const corePackagePath = resolve(cwd(), 'packages', 'savescum', 'README.md')
const webPackagePath = resolve(cwd(), 'packages', 'web', 'README.md')

async function main() {
  await copyFile(readmePath, corePackagePath)
  await copyFile(readmePath, webPackagePath)
}

main().catch((err: unknown) => {
  if (err instanceof Error) {
    console.error(`${err.name}: ${err.message}`)
    process.exit(1)
  }
})
