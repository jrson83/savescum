import type { Command } from '@commander-js/extra-typings'
import { FTPClient } from '../core'
import type { FtpSchema } from '../types'
import { beep, info, message, success } from '../utils'

export async function testCommand(cmd: Command): Promise<void> {
  const { debug, ip, port, sound, user } = cmd.optsWithGlobals() as FtpSchema

  info('Running connection test ...')

  if (debug) {
    message(`- Connecting to ftp://${user}@${ip}:${port}\n`)
  }

  const response = await FTPClient.test(cmd.optsWithGlobals() as FtpSchema)

  if (response?.success) {
    success(response.message)
    if (sound) await beep().then(() => process.exit(0))
  }
}
