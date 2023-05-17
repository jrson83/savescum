import { FTPClient } from '../ftp-client'
import { beep, info, message, success } from '../utils'
import type { Command } from '@commander-js/extra-typings'

export async function testCommand(cmd: Command): Promise<void> {
  const { debug, ip, port, sound, user } = cmd.optsWithGlobals()
  info('Running connection test ...')

  if (debug) {
    message(`- Connecting to ftp://${user}@${ip}:${port}\n`)
  }

  const response = await FTPClient.test(cmd.optsWithGlobals())

  if (response) {
    success('Connection succeeded')
    if (sound) await beep().then(() => process.exit(0))
  }
}
