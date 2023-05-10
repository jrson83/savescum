#!/usr/bin/env node
import { rename } from 'node:fs/promises'
import { format, parse, resolve } from 'node:path'
/**
 * Renames a file
 * @param {string}  path - The target file path
 * @param {string}  newExt - The new extension
 * @returns {Promise<void>}
 */
async function afterBuild(path, newExt) {
  if (!newExt.startsWith('.')) {
    throw new Error(
      'Extension must start with a dot: ' + JSON.stringify(newExt)
    )
  }
  const parts = parse(path)
  // @ts-ignore
  const newPath = format({
    ...parts,
    base: `index${newExt}`, // prevent .base from overriding .name and .ext
    ext: newExt,
  })

  await rename(path, newPath)
}

afterBuild(
  resolve(process.cwd(), 'packages', 'savescum', 'dist', 'index.cjs.js'),
  '.cjs'
)
