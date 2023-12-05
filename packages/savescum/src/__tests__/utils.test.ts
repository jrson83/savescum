import { join, resolve } from 'node:path'
import { cwd } from 'node:process'
import mock from 'mock-fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fileExists, formatPath, merge } from '../utils'
import {
  backupPath,
  fakeDate,
  localSavegamePath,
  remoteSavegamePath,
} from './setup'

const saveGame = {
  profileId: '1ceaa172',
  cusa: 'CUSA00207',
  sdimg: 'sdimg_SPRJ0005',
}

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

  it('file exists', async () => {
    expect(await fileExists(localSavegamePath)).toBe(true)
  })

  it('file does not exists', async () => {
    expect(await fileExists('not.exist')).toBe(false)
  })

  it('merge ftp.opts() & savegame', () => {
    const options = merge(
      {
        port: 2121,
        user: 'anonymous',
        password: '',
        secure: false,
        sound: true,
        debug: false,
        ip: '192.168.56.1',
      },
      {
        ...saveGame,
        backupPath,
      }
    )
    expect(options).toMatchObject({
      ftp: {
        port: 2121,
        user: 'anonymous',
        password: '',
        secure: false,
        sound: true,
        debug: false,
        ip: '192.168.56.1',
      },
      savegame: {
        ...saveGame,
        backupPath,
      },
    })
  })

  it('local to remote path with empty `backupPath', () => {
    // https://github.com/vitest-dev/vitest/issues/506#issuecomment-1021317811
    vi.useFakeTimers()
    vi.setSystemTime(fakeDate)

    expect(formatPath(saveGame)).toMatchObject({
      dest: localSavegamePath,
      src: remoteSavegamePath,
    })

    vi.useRealTimers()
  })

  it('local to remote path with `backupPath', () => {
    // https://github.com/vitest-dev/vitest/issues/506#issuecomment-1021317811
    vi.useFakeTimers()
    vi.setSystemTime(fakeDate)

    expect(
      formatPath({
        ...saveGame,
        backupPath,
      })
    ).toMatchObject({
      dest: localSavegamePath,
      src: remoteSavegamePath,
    })

    vi.useRealTimers()
  })

  it('remote to local path with empty `backupPath`', () => {
    expect(formatPath(saveGame, fakeDate)).toMatchObject({
      dest: remoteSavegamePath,
      src: localSavegamePath,
    })
  })

  it('remote to local path with `backupPath`', () => {
    expect(
      formatPath(
        {
          ...saveGame,
          backupPath,
        },
        fakeDate
      )
    ).toMatchObject({
      dest: remoteSavegamePath,
      src: localSavegamePath,
    })
  })
})
