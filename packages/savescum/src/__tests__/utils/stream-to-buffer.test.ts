import { deepStrictEqual, rejects } from 'node:assert/strict'
import { Readable } from 'node:stream'
import { describe, it } from 'node:test'
import { profiles } from '../setup'

import { streamToBuffer } from '../../utils/stream-to-buffer'

describe('streamToBuffer', () => {
  it('should convert a stream of buffers into a buffer', async () => {
    const stream = new Readable()

    const promise = streamToBuffer(stream)

    stream.push(Buffer.from(profiles[0].profileId, 'utf8'))
    stream.push(Buffer.from(' ', 'utf8'))
    stream.push(Buffer.from(profiles[0].username, 'utf8'))
    stream.push(null)

    deepStrictEqual(
      await promise,
      Buffer.from(`${profiles[0].profileId} ${profiles[0].username}`, 'utf8')
    )
  })

  it('should reject an error if the stream emits an error', async () => {
    const stream = new Readable()

    stream.push(null)

    const promise = streamToBuffer(stream)

    stream.emit('error', new Error('noop'))

    await rejects(promise, new Error('noop'))
  })
})
