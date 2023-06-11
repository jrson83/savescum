import { FTPClient } from '../ftp-client'
import type { FtpSchema, OptionsSchema, SavegameSchema } from '../types'
import * as util from '../utils'
import { Client } from 'basic-ftp'
import mock from 'mock-fs'
import { mkdir } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const backupPath = join(homedir(), 'savescum')
const dest = '/user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005'
const src = join(
  backupPath,
  '1ceaa172',
  'CUSA00207',
  '1685577884592',
  'sdimg_SPRJ0005'
)

const ftp: FtpSchema = {
  requestType: 'browser',
  ip: '192.168.56.1',
  port: 21,
  user: 'anonymous',
  password: '',
  secure: false,
  debug: false,
  sound: true,
}

const savegame: SavegameSchema = {
  profileId: '1ceaa172',
  cusa: 'CUSA00207',
  sdimg: 'sdimg_SPRJ0005',
  backupPath,
}

const options: OptionsSchema = {
  ftp,
  savegame,
}

const testResponse = {
  success: true,
  message: 'A connection was successfully established with the ftp-server.',
}

const backupResponse = {
  success: true,
  message: 'Backup operation has been successfully finished.',
  savegame,
}

const restoreResponse = {
  success: true,
  message: 'Restore operation has been successfully finished.',
  savegame,
}

vi.mock('basic-ftp', () => {
  const Client = vi.fn()
  Client.prototype.access = vi.fn()
  Client.prototype.pwd = vi.fn()
  Client.prototype.close = vi.fn()
  Client.prototype.ftp = vi.fn()
  Client.prototype.downloadTo = vi.fn()
  Client.prototype.uploadFrom = vi.fn()

  return { Client }
})

describe('ftp test', () => {
  let client: any

  beforeEach(() => {
    client = new Client()
    client.ftp.verbose = true
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('connection test', async () => {
    client.pwd.mockResolvedValueOnce('/')

    const response = await FTPClient.test(options.ftp)

    expect(client.access).toBeCalledTimes(1)
    expect(client.pwd).toBeCalledTimes(1)
    expect(client.close).toBeCalledTimes(1)

    expect(response).toStrictEqual(testResponse)
  })

  it('backup test', async () => {
    const spy = vi.spyOn(util, 'paths')
    expect(spy.getMockName()).toEqual('paths')

    const date = new Date(1685577884592)

    vi.useFakeTimers()
    vi.setSystemTime(date)

    client.pwd.mockResolvedValueOnce('/')
    client.downloadTo.mockResolvedValueOnce({ ...backupResponse, code: 200 })

    const response = await FTPClient.backup(options)

    expect(client.access).toBeCalledTimes(1)
    expect(client.downloadTo).toBeCalledTimes(1)
    expect(client.downloadTo).toBeCalledWith(src, dest)
    expect(client.close).toBeCalledTimes(1)

    expect(response).toStrictEqual(backupResponse)

    vi.useRealTimers()
  })
})
