#!/usr/bin/env node
import type { Dirent } from 'fs'
import { readdir, rm } from 'fs/promises'
import { cwd } from 'node:process'

async function removeWorkspaceDir(path: string): Promise<void> {
  const root: string = path || cwd()
  try {
    const contents: Dirent[] = await readdir(root, { withFileTypes: true })
    for (const content of contents) {
      const name: string = content.name
      const isDir: boolean = content.isDirectory()

      if (isDir && !name.startsWith('.')) {
        if (name === 'node_modules') {
          console.log(`Cleaning: ${root}/${name}`)
          await rm(`${root}/${name}`, { recursive: true, force: true })
        } else await removeWorkspaceDir(`${root}/${name}`)
      }
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error at path ${root}: ${err.message}`)
    }
  }
}

removeWorkspaceDir(cwd())
