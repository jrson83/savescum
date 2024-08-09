import { strictEqual, throws } from 'node:assert/strict'
import { beforeEach, describe, it, mock } from 'node:test'
import { fakeFolder, mockDate } from '../setup'

import { dateToPath } from '../../utils/date-to-path'

describe('dateToPath', () => {
  beforeEach(() => mock.restoreAll())

  it('should throw an error with invalid type param', () => {
    const result = () => dateToPath('12345' as unknown as Date)

    throws(result, TypeError)
  })

  it('should convert date to path with valid param', () => {
    const result = dateToPath(mockDate)

    strictEqual(result, fakeFolder)
  })

  it('should convert date to path without param', () => {
    // todo: replace with new API https://nodejs.org/api/test.html#mocking
    const fn = mock.method(global.Date, 'now')
    fn.mock.mockImplementation(() => Number(mockDate))

    strictEqual(fn.mock.calls.length, 0)

    const result = dateToPath()

    strictEqual(result, fakeFolder)

    strictEqual(fn.mock.callCount(), 1)

    const call = fn.mock.calls[0]
    strictEqual(call.result, Number(mockDate))
    strictEqual(call.error, undefined)
  })
})
