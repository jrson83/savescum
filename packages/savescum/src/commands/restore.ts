import { FTPClient } from '../ftp-client'
import type { Options } from '../types'
import { beep, info, success } from '../utils'

export async function restoreCommand(options: Options): Promise<void> {
  info('Running restore ...')

  const response = await FTPClient.restore(options)

  if (response.status === 200) {
    success('Restore completed')
    if (options.ftp.sound) await beep().then(() => process.exit(0))
  }
}
