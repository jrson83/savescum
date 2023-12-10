import { dirname as pathDirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export function dirname(importMeta: ImportMeta) {
  return pathDirname(filename(importMeta))
}

export function filename(importMeta: ImportMeta) {
  return importMeta.url ? fileURLToPath(importMeta.url) : ''
}
