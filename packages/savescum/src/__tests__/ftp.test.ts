import { FTPClient } from '../ftp-client'
import * as util from '../utils'
import {
  backupResponse,
  cusaPath,
  fakeDate,
  localSavegamePath,
  options,
  remoteSavegamePath,
  restoreResponse,
  testResponse,
} from './setup'
import { Client } from 'basic-ftp'
import mock from 'mock-fs'
import { normalize } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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
  let spy: any

  beforeEach(() => {
    client = new Client()
    client.ftp.verbose = true

    spy = vi.spyOn(util, 'paths')

    mock({
      [normalize(remoteSavegamePath)]: 'test savegame content',
      [cusaPath]: {},
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mock.restore()
  })

  it('should run ftp connection test cmd with success', async () => {
    client.pwd.mockResolvedValueOnce('/')

    const response = await FTPClient.test(options.ftp)

    expect(client.access).toBeCalledTimes(1)
    expect(client.pwd).toBeCalledTimes(1)
    expect(client.close).toBeCalledTimes(1)

    expect(response).toStrictEqual(testResponse)
  })

  it('should run ftp backup cmd with success', async () => {
    expect(spy.getMockName()).toEqual('paths')

    expect(await util.fileExists(cusaPath)).toBe(true)

    vi.useFakeTimers()
    vi.setSystemTime(fakeDate)

    client.pwd.mockResolvedValueOnce('/')
    client.downloadTo.mockResolvedValueOnce({ ...backupResponse, code: 200 })

    const response = await FTPClient.backup(options)

    expect(client.access).toBeCalledTimes(1)
    expect(client.downloadTo).toBeCalledTimes(1)
    expect(client.downloadTo).toBeCalledWith(
      localSavegamePath,
      remoteSavegamePath
    )
    expect(client.close).toBeCalledTimes(1)

    expect(response).toStrictEqual(backupResponse)

    mock({
      [normalize(localSavegamePath)]: 'test savegame content',
    })

    expect(await util.fileExists(localSavegamePath)).toBe(true)

    vi.useRealTimers()
  })

  it('should run ftp restore cmd with success', async () => {
    expect(spy.getMockName()).toEqual('paths')

    expect(await util.fileExists(cusaPath)).toBe(true)

    vi.useFakeTimers()
    vi.setSystemTime(fakeDate)

    client.uploadFrom.mockResolvedValueOnce({ ...restoreResponse, code: 200 })

    mock({
      [normalize(localSavegamePath)]: 'test savegame content',
    })

    const response = await FTPClient.restore(options)

    expect(client.access).toBeCalledTimes(1)
    expect(client.uploadFrom).toBeCalledTimes(1)
    expect(client.uploadFrom).toBeCalledWith(
      localSavegamePath,
      remoteSavegamePath
    )
    expect(client.close).toBeCalledTimes(1)

    expect(response).toStrictEqual(restoreResponse)

    vi.useRealTimers()
  })
})
