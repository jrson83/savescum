import { normalize, resolve } from 'node:path'
import { Client } from 'basic-ftp'
import mock from 'mock-fs'
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { FTPClient } from '../ftp-client'
import * as util from '../utils'
import {
  backupResponse,
  cusaPath,
  ensureResponse,
  fakeDate,
  localSavegamePath,
  options,
  remoteSavegamePath,
  restoreResponse,
  testResponse,
} from './vitest.setup'

vi.mock('basic-ftp', () => {
  const Client = vi.fn()
  Client.prototype.access = vi.fn()
  Client.prototype.cd = vi.fn()
  Client.prototype.close = vi.fn()
  Client.prototype.downloadTo = vi.fn()
  Client.prototype.ftp = vi.fn()
  Client.prototype.list = vi.fn()
  Client.prototype.pwd = vi.fn()
  Client.prototype.size = vi.fn()
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
      [normalize(remoteSavegamePath)]: mock.load(
        resolve(__dirname, 'assets/sdimg_SPRJ0005')
      ),
      [cusaPath]: {},
    })
  })

  afterAll(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
    mock.restore()
  })

  it('should run ftp connection test cmd with success', async () => {
    client.pwd.mockResolvedValueOnce('/')

    const response = await FTPClient.test(options.ftp)

    expect(client.access).toBeCalledTimes(1)
    expect(client.access).toBeCalledWith({
      host: '192.168.56.1',
      port: 21,
      user: 'anonymous',
      password: '',
      secure: false,
    })
    expect(client.pwd).toBeCalledTimes(1)
    expect(client.close).toBeCalledTimes(1)

    expect(response).toStrictEqual(testResponse)
  })

  it('should run ftp ensure cmd with success', async () => {
    expect(spy.getMockName()).toEqual('paths')

    expect(await util.fileExists(cusaPath)).toBe(true)

    vi.useFakeTimers()
    vi.setSystemTime(fakeDate)

    const response = await FTPClient.ensure(options)

    expect(client.access).toBeCalledTimes(1)
    expect(client.size).toBeCalledTimes(1)
    expect(client.size).toBeCalledWith(remoteSavegamePath)
    expect(client.close).toBeCalledTimes(1)

    expect(response).toStrictEqual(ensureResponse)

    vi.useRealTimers()
  })

  it('should run ftp backup cmd with success', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(fakeDate)

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
      [normalize(localSavegamePath)]: 'fake\r\n',
    })

    expect(await util.fileExists(localSavegamePath)).toBe(true)

    vi.useRealTimers()
  })

  it('should run ftp restore cmd with success', async () => {
    expect(await util.fileExists(cusaPath)).toBe(true)

    vi.useFakeTimers()
    vi.setSystemTime(fakeDate)

    mock({
      [normalize(localSavegamePath)]: 'fake\r\n',
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
