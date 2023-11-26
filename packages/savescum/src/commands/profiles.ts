import type { Command } from '@commander-js/extra-typings'
import { FTPClient } from '../ftp-client'
import type { FtpSchema } from '../types'
import { beep, colorize, info, message, success } from '../utils'

export async function profilesCommand(cmd: Command): Promise<void> {
  const { debug, ip, port, sound, user } = cmd.optsWithGlobals() as FtpSchema

  info('Getting profiles ...')

  if (debug) {
    message(`- Connecting to ftp://${user}@${ip}:${port}\n`)
  }

  const response = await FTPClient.profiles(cmd.optsWithGlobals() as FtpSchema)

  if (response?.success) {
    success(`${response.message}\n`)

    if (Array.isArray(response.profiles) && response.profiles.length > 0) {
      info(
        `Found ${response.profiles.length} profile${
          response.profiles.length > 1 ? 's' : ''
        }:`
      )

      for (const { profileId, username, avatar } of response.profiles) {
        console.log(`  ${colorize.green('➜')} ID: ${profileId}`)
        console.log(`    Username: ${username}`)
        console.log(`    Avatar: ${avatar?.slice(0, 20)}...\n`)
      }
    }
    if (sound) await beep().then(() => process.exit(0))
  }
}
