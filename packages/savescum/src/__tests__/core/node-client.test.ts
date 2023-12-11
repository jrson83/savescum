import { deepStrictEqual } from 'node:assert/strict'
import { normalize } from 'node:path'
import { afterEach, beforeEach, describe, it } from 'node:test'
import { default as mockFs } from 'mock-fs'
import {
  historyResponse,
  localSavegamePath,
  mockDate,
  savegame,
} from '../setup'

import { NodeClient } from '../../core/node-client'

describe('NodeClient', () => {
  beforeEach(() => {
    mockFs({
      [normalize(localSavegamePath)]: mockFs.file({
        content: 'fake',
        ctime: mockDate,
        mtime: mockDate,
        birthtime: mockDate,
      }),
    })
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('should run node history cmd with success', async (t) => {
    const latestBackup = await NodeClient.history(savegame)

    deepStrictEqual(latestBackup, historyResponse)
  })
})
