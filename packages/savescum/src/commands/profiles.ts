import type { Command } from '@commander-js/extra-typings'
import { FTPClient } from '../ftp-client'
import type { FtpSchema } from '../types'
import { beep, info, message, success } from '../utils'

export async function listProfilesCommand(cmd: Command): Promise<void> {
  const { debug, ip, port, sound, user } = cmd.optsWithGlobals() as FtpSchema

  info('Getting profiles ...')

  if (debug) {
    message(`- Connecting to ftp://${user}@${ip}:${port}\n`)
  }

  const response = await FTPClient.listProfiles(
    cmd.optsWithGlobals() as FtpSchema
  )

  if (response?.success) {
    success(response.message)
    /* success(JSON.stringify(response.profiles)) */
    if (sound) await beep().then(() => process.exit(0))
  }
}
