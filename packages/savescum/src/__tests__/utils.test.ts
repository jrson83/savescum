import { fileExists, merge, paths } from '../utils'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { describe, expect, it, vi } from 'vitest'

const saveGame = {
  profileId: '1ceaa172',
  cusa: 'CUSA00207',
  sdimg: 'sdimg_SPRJ0005',
}

describe('utils test', () => {
  it('file exists', async () => {
    expect(await fileExists(join(cwd(), 'package.json'))).toBe(true)
  })

  it('file does not exists', async () => {
    expect(await fileExists(join(cwd(), 'save.scum'))).toBe(false)
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
        backupPath: 'C:\\Users\\jrson\\savescum',
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
        backupPath: 'C:\\Users\\jrson\\savescum',
      },
    })
  })

  it('local to remote path with empty `backupPath', () => {
    // https://github.com/vitest-dev/vitest/issues/506#issuecomment-1021317811
    const date = new Date(1685577884592)

    vi.useFakeTimers()
    vi.setSystemTime(date)

    expect(paths(saveGame)).toMatchObject({
      dest: join(
        homedir(),
        'savescum',
        '1ceaa172',
        'CUSA00207',
        String(date.valueOf()),
        'sdimg_SPRJ0005'
      ),
      src: '/user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005',
    })

    vi.useRealTimers()
  })

  it('local to remote path with `backupPath', () => {
    // https://github.com/vitest-dev/vitest/issues/506#issuecomment-1021317811
    const date = new Date(1685577884592)

    vi.useFakeTimers()
    vi.setSystemTime(date)

    expect(
      paths({
        ...saveGame,
        backupPath: join(homedir(), 'savescum'),
      })
    ).toMatchObject({
      dest: join(
        homedir(),
        'savescum',
        '1ceaa172',
        'CUSA00207',
        String(date.valueOf()),
        'sdimg_SPRJ0005'
      ),
      src: '/user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005',
    })

    vi.useRealTimers()
  })

  it('remote to local path with empty `backupPath`', () => {
    expect(paths(saveGame, '1685577884592')).toMatchObject({
      dest: '/user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005',
      src: join(
        homedir(),
        'savescum',
        '1ceaa172',
        'CUSA00207',
        '1685577884592',
        'sdimg_SPRJ0005'
      ),
    })
  })

  it('remote to local path with `backupPath`', () => {
    expect(
      paths(
        {
          ...saveGame,
          backupPath: join(homedir(), 'savescum'),
        },
        '1685577884592'
      )
    ).toMatchObject({
      dest: '/user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005',
      src: join(
        homedir(),
        'savescum',
        '1ceaa172',
        'CUSA00207',
        '1685577884592',
        'sdimg_SPRJ0005'
      ),
    })
  })
})
