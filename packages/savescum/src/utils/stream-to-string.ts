import { Buffer } from 'node:buffer'
import type { Readable } from 'node:stream'

export async function streamToString(stream: Readable): Promise<string> {
  const chunks: Buffer[] = []

  for await (const chunk of stream) {
    chunks.push(chunk)
  }

  const buffer = Buffer.concat(chunks).subarray(0, 16)

  return Buffer.concat(
    chunks,
    buffer.indexOf(0x00) === -1 ? buffer.length : buffer.indexOf(0x00)
  ).toString('utf8')
}
