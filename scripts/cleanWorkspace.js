#!/usr/bin/env node
import { cwd } from 'node:process'
import { readdir, rm } from 'fs/promises'

/**
 * Deletes node_modules folders inside a workspace recursively & parallel
 *
 * @param {string} [root=process.cwd()] - The target path
 * @returns {Promise<void>}
 */
async function removeWorkspaceDir(root = cwd()) {
  try {
    const contents = await readdir(root, { withFileTypes: true })
    for (const content of contents) {
      const name = content.name
      const isDir = content.isDirectory()

      if (isDir && !name.startsWith('.')) {
        if (name === 'node_modules') {
          console.log(`Cleaning: ${root}/${name}`)
          await rm(`${root}/${name}`, { recursive: true, force: true })
        } else await removeWorkspaceDir(`${root}/${name}`)
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error at path ${root}: ${err.message}`)
    }
  }
}

removeWorkspaceDir(cwd())
