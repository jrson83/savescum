import { deepStrictEqual, strictEqual } from 'node:assert/strict'
import { default as fsPromises } from 'node:fs/promises'
import { normalize } from 'node:path'
import { afterEach, describe, it } from 'node:test'
import { Client } from 'basic-ftp'
import { default as mockFs } from 'mock-fs'
import { fileExists } from '../../utils'
import {
  backupResponse,
  ensureResponse,
  localSavegamePath,
  mockDate,
  options,
  restoreResponse,
  testResponse,
} from '../setup'

import { FTPClient } from '../../core'

describe('FTPClient', () => {
  afterEach(() => {
    mockFs.restore()
  })

  it('should return an instance of basic-ftp Client', async (t) => {
    t.mock.method(Client.prototype, 'access', async () => Promise.resolve())

    const response = await FTPClient.connect(options.ftp)

    strictEqual(response instanceof Client, true)
  })

  it('should run ftp connection test cmd with success', async (t) => {
    t.mock.method(Client.prototype, 'access', async () => Promise.resolve())
    t.mock.method(Client.prototype, 'pwd', async () => Promise.resolve('/'))

    const response = await FTPClient.test(options.ftp)

    deepStrictEqual(response, testResponse)
  })

  it('should run ftp ensure cmd with success', async (t) => {
    // todo: replace with new API https://nodejs.org/api/test.html#mocking
    t.mock.method(global.Date, 'now', () => mockDate)

    t.mock.method(Client.prototype, 'access', async () => Promise.resolve())
    t.mock.method(Client.prototype, 'size', async () =>
      Promise.resolve({
        code: 250,
        message: '250 CWD command successful',
      })
    )

    const response = await FTPClient.ensure(options)

    deepStrictEqual(response, ensureResponse)
  })

  it('should run ftp backup cmd with success', async (t) => {
    t.mock.method(global.Date, 'now', () => mockDate)

    t.mock.method(Client.prototype, 'access', async () => Promise.resolve())
    t.mock.method(Client.prototype, 'size', async () =>
      Promise.resolve({
        code: 250,
        message: '250 CWD command successful',
      })
    )
    t.mock.method(fsPromises, 'mkdir', async () => Promise.resolve())
    t.mock.method(Client.prototype, 'downloadTo', async () =>
      Promise.resolve({
        code: 226,
        message: '226 Transfer Complete',
      })
    )

    const response = await FTPClient.backup(options)

    deepStrictEqual(response, backupResponse)

    mockFs({
      [normalize(localSavegamePath)]: mockFs.file({
        content: 'fake',
        ctime: mockDate,
        mtime: mockDate,
        birthtime: mockDate,
      }),
    })

    const localSavegame = await fileExists(localSavegamePath)

    strictEqual(localSavegame, true)
  })

  it('should run ftp restore cmd with success', async (t) => {
    t.mock.method(global.Date, 'now', () => mockDate)

    mockFs({
      [normalize(localSavegamePath)]: mockFs.file({
        content: 'fake',
        ctime: mockDate,
        mtime: mockDate,
        birthtime: mockDate,
      }),
    })

    t.mock.method(Client.prototype, 'access', async () => Promise.resolve())
    t.mock.method(Client.prototype, 'uploadFrom', async () =>
      Promise.resolve({
        code: 226,
        message: '226 Transfer Complete',
      })
    )

    const response = await FTPClient.restore(options)

    deepStrictEqual(response, restoreResponse)
  })
})
