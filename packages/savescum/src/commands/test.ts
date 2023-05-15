import { FTPClient } from '../ftp-client'
import { beep, info, message, success } from '../utils'
import type { Command } from '@commander-js/extra-typings'

export async function testCommand(cmd: Command): Promise<void> {
  const { debug, user, ip, port } = cmd.optsWithGlobals()
  info('Running connection test ...')

  if (debug) {
    message(`- Connecting to ftp://${user}@${ip}:${port}\n`)
  }

  const response = await FTPClient.test(cmd.optsWithGlobals())

  if (response) {
    success('Connection succeeded')
    await beep()
    process.exit(0)
  }
}
