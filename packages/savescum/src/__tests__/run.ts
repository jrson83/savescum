#!/usr/bin/env node
import { readdir } from 'node:fs/promises'
import { cpus } from 'node:os'
import { basename, join } from 'node:path'
import { run } from 'node:test'
import { spec as Spec } from 'node:test/reporters'
import { dirname, filename } from '../utils/esm-shim'

const __dirname = dirname(import.meta)
const __filename = filename(import.meta)

const spec = new Spec()

const files = await resolveTestFiles()

const testStream = run({
  files,
  timeout: 60 * 1000,
  concurrency: cpus().length,
  watch: false,
})

testStream.compose(spec).pipe(process.stdout)

async function resolveTestFiles(root = __dirname) {
  const files: string[] = []

  try {
    const contents = await readdir(root, {
      withFileTypes: true,
      recursive: true,
    })

    const filteredContents = contents.filter(
      (content) =>
        !content.isDirectory() &&
        content.name.endsWith('.test.ts') &&
        content.name !== basename(__filename)
    )

    files.push(
      ...filteredContents.map((content) => join(content.path, content.name))
    )

    return files
  } catch (err) {
    console.error('Error reading directory:', err)
  }
}
