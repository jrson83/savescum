import { Buffer } from 'node:buffer'
import type { Readable } from 'node:stream'

export async function streamToBuffer(stream: Readable): Promise<string> {
  const chunks: Buffer[] = []

  for await (const chunk of stream) {
    chunks.push(chunk)
  }

  return Buffer.concat(chunks).toString('base64')
}
