import { normalize } from 'node:path'
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
import { streamToBuffer } from '../utils/stream-to-buffer'
import { streamToString } from '../utils/stream-to-string'
import {
  backupResponse,
  cusaPath,
  ensureResponse,
  localSavegamePath,
  mockDate,
  options,
  profilesResponse,
  remoteSavegamePath,
  restoreResponse,
  testResponse,
} from './setup'

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

vi.mock('../utils/stream-to-buffer')
vi.mock('../utils/stream-to-string')

describe('ftp test', () => {
  let client: any
  let spy: any

  beforeEach(() => {
    client = new Client()
    client.ftp.verbose = true

    spy = vi.spyOn(util, 'formatPath')

    mock({
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
    client.size.mockResolvedValue({
      code: 250,
      message: '250 CWD command successful',
    })

    vi.useFakeTimers()
    vi.setSystemTime(mockDate)

    const response = await FTPClient.ensure(options)

    expect(client.access).toBeCalledTimes(1)
    expect(client.size).toBeCalledTimes(1)
    expect(client.size).toBeCalledWith(remoteSavegamePath)

    expect(client.size).toReturnWith({
      code: 250,
      message: '250 CWD command successful',
    })

    expect(client.close).toBeCalledTimes(1)

    expect(response).toStrictEqual(ensureResponse)

    vi.useRealTimers()
  })

  it('should run ftp backup cmd with success', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)

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
    vi.setSystemTime(mockDate)

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

  it('should run ftp profiles cmd with success', async () => {
    const mockedStreamToString = vi.mocked(streamToString)
    mockedStreamToString.mockResolvedValueOnce('chiaki')
    mockedStreamToString.mockResolvedValueOnce('AHunterMustHunt')

    const mockedStreamToBuffer = vi.mocked(streamToBuffer)
    mockedStreamToBuffer.mockResolvedValueOnce('base64png_chiaki')
    mockedStreamToBuffer.mockResolvedValueOnce('base64png_AHunterMustHunt')

    client.cd.mockResolvedValue({
      code: 250,
      message: '250 CWD command successful',
    })
    client.list.mockResolvedValue([{ name: '1bexx117' }, { name: '1ceaa172' }])
    client.downloadTo.mockResolvedValue({
      code: 226,
      message: '226 Transfer Complete',
    })

    const response = await FTPClient.profiles(options.ftp)

    expect(client.access).toBeCalledTimes(1)

    expect(client.cd).toBeCalledTimes(1)
    expect(client.cd).toBeCalledWith('/user/home')

    expect(client.list).toBeCalledTimes(1)

    expect(client.downloadTo).toBeCalledTimes(4)
    expect(client.downloadTo).toReturnWith({
      code: 226,
      message: '226 Transfer Complete',
    })

    expect(mockedStreamToString).toBeCalledTimes(2)
    expect(mockedStreamToString).toReturnWith('chiaki')
    expect(mockedStreamToString).toReturnWith('AHunterMustHunt')

    expect(mockedStreamToBuffer).toBeCalledTimes(2)
    expect(mockedStreamToBuffer).toReturnWith('base64png_chiaki')
    expect(mockedStreamToBuffer).toReturnWith('base64png_AHunterMustHunt')

    expect(client.size).toBeCalledTimes(2)

    expect(client.close).toBeCalledTimes(1)

    expect(response).toStrictEqual(profilesResponse)
  })
})
