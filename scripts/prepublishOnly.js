#!/usr/bin/env node
import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

const root = cwd()
const filesList = ['LICENSE', 'README.md']
const packages = ['savescum', 'web']

/**
 * Copies LICENSE & README.md to packages
 *
 * @returns {Promise<void>}
 */
async function main() {
  try {
    for (const pkg of packages) {
      for (const file of filesList) {
        await copyFile(
          resolve(root, file),
          resolve(root, 'packages', pkg, file)
        )
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`${err.name}: ${err.message}`)
      process.exit(1)
    }
  }
}

main()
