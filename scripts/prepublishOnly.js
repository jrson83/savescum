#!/usr/bin/env node
import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

const licensePath = resolve(cwd(), 'LICENSE')
const readmePath = resolve(cwd(), 'README.md')
const corePackageReadme = resolve(cwd(), 'packages', 'savescum', 'README.md')
const corePackageLicense = resolve(cwd(), 'packages', 'savescum', 'LICENSE')
const webPackageReadme = resolve(cwd(), 'packages', 'web', 'README.md')
const webPackageLicense = resolve(cwd(), 'packages', 'web', 'LICENSE')

/**
 * Copies LICENSE and README.md to packages parallel
 *
 * @returns {Promise<void>}
 */
async function main() {
  try {
    await Promise.all([
      await copyFile(readmePath, corePackageReadme),
      await copyFile(licensePath, corePackageLicense),
      await copyFile(readmePath, webPackageReadme),
      await copyFile(licensePath, webPackageLicense),
    ])
  } catch (err) {
    if (err instanceof Error) {
      console.error(`${err.name}: ${err.message}`)
      process.exit(1)
    }
  }
}

main()
