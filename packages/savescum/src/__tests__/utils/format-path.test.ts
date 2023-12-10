import { deepStrictEqual, strictEqual } from 'node:assert/strict'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, it, mock } from 'node:test'
import { default as mockFs } from 'mock-fs'
import { dirname } from '../../utils/esm-shim'
import {
  backupPath,
  localSavegamePath,
  mockDate,
  remoteSavegamePath,
  savegame,
} from '../setup'

import { formatPath } from '../../utils/format-path'

const __dirname = dirname(import.meta)

describe('formatPath', () => {
  beforeEach(() => {
    mockFs({
      [localSavegamePath]: mockFs.load(
        resolve(__dirname, '..', '.assets', 'sdimg_SPRJ0005')
      ),
    })

    mock.restoreAll()
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('should format given local to remote path without backupPath', () => {
    // todo: replace with new API https://nodejs.org/api/test.html#mocking
    const fn = mock.method(global.Date, 'now')
    fn.mock.mockImplementation(() => mockDate)

    strictEqual(fn.mock.calls.length, 0)

    const result = formatPath(savegame)

    deepStrictEqual(result, {
      dest: localSavegamePath,
      src: remoteSavegamePath,
    })

    strictEqual(fn.mock.callCount(), 1)

    const call = fn.mock.calls[0]
    strictEqual(call.result?.toString(), mockDate.toString())
    strictEqual(call.error, undefined)
  })

  it('should format given local to remote path with backupPath', () => {
    // todo: replace with new API https://nodejs.org/api/test.html#mocking
    const fn = mock.method(global.Date, 'now')
    fn.mock.mockImplementation(() => mockDate)

    strictEqual(fn.mock.calls.length, 0)

    const result = formatPath({
      ...savegame,
      backupPath,
    })

    deepStrictEqual(result, {
      dest: localSavegamePath,
      src: remoteSavegamePath,
    })

    strictEqual(fn.mock.callCount(), 1)

    const call = fn.mock.calls[0]
    strictEqual(call.result?.toString(), mockDate.toString())
    strictEqual(call.error, undefined)
  })

  it('should format given remote to local path without backupPath', () => {
    const result = formatPath(savegame, mockDate)

    deepStrictEqual(result, {
      dest: remoteSavegamePath,
      src: localSavegamePath,
    })
  })

  it('should format given remote to local path with backupPath', () => {
    const result = formatPath(
      {
        ...savegame,
        backupPath,
      },
      mockDate
    )

    deepStrictEqual(result, {
      dest: remoteSavegamePath,
      src: localSavegamePath,
    })
  })
})
