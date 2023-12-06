import { resolve } from 'node:path'
import mock from 'mock-fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fileExists, formatPath, merge } from '../utils'
import {
  backupPath,
  ftp,
  localSavegamePath,
  mockDate,
  remoteSavegamePath,
  savegame,
} from './setup'

describe('utils test', () => {
  beforeEach(() => {
    mock({
      [localSavegamePath]: mock.load(
        resolve(__dirname, 'assets', 'sdimg_SPRJ0005')
      ),
    })
  })

  afterEach(() => {
    mock.restore()
  })

  it('should return true if file exists', async () => {
    expect(await fileExists(localSavegamePath)).toBe(true)
  })

  it('should return false if file does not exists', async () => {
    expect(await fileExists('not.exist')).toBe(false)
  })

  it('should merge ftp.opts() & savegame', () => {
    const options = merge(ftp, {
      ...savegame,
      backupPath,
    })
    expect(options).toMatchObject({
      ftp,
      savegame: {
        ...savegame,
        backupPath,
      },
    })
  })

  it('should format local to remote path with empty `backupPath', () => {
    // https://github.com/vitest-dev/vitest/issues/506#issuecomment-1021317811
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)

    expect(formatPath(savegame)).toMatchObject({
      dest: localSavegamePath,
      src: remoteSavegamePath,
    })

    vi.useRealTimers()
  })

  it('should format local to remote path with `backupPath', () => {
    // https://github.com/vitest-dev/vitest/issues/506#issuecomment-1021317811
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)

    expect(
      formatPath({
        ...savegame,
        backupPath,
      })
    ).toMatchObject({
      dest: localSavegamePath,
      src: remoteSavegamePath,
    })

    vi.useRealTimers()
  })

  it('should format remote to local path with empty `backupPath`', () => {
    expect(formatPath(savegame, mockDate)).toMatchObject({
      dest: remoteSavegamePath,
      src: localSavegamePath,
    })
  })

  it('should format remote to local path with `backupPath`', () => {
    expect(
      formatPath(
        {
          ...savegame,
          backupPath,
        },
        mockDate
      )
    ).toMatchObject({
      dest: remoteSavegamePath,
      src: localSavegamePath,
    })
  })
})
