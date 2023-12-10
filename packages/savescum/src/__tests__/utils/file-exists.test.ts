import { strictEqual } from 'node:assert/strict'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, it } from 'node:test'
import { default as mockFs } from 'mock-fs'
import { dirname } from '../../utils/esm-shim'
import { localSavegamePath } from '../setup'

import { fileExists } from '../../utils/file-exists'

const __dirname = dirname(import.meta)

describe('fileExists', () => {
  beforeEach(() => {
    mockFs({
      [localSavegamePath]: mockFs.load(
        resolve(__dirname, '..', '.assets', 'sdimg_SPRJ0005')
      ),
    })
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('should return false and not throw an error if the given file not exist', async () => {
    const result = await fileExists('not.exist')

    strictEqual(result, false)
  })

  it('should return true if the given file exists', async () => {
    const result = await fileExists(localSavegamePath)

    strictEqual(result, true)
  })
})
