import { FTPClient } from '../ftp-client'
import type { OptionsSchema } from '../types'
import { beep, info, success } from '../utils'

export async function backupCommand(options: OptionsSchema): Promise<void> {
  info('Running backup ...')

  const response = await FTPClient.backup(options)

  if (response?.success) {
    success(response.message)
    if (options.ftp.sound) await beep().then(() => process.exit(0))
  }
}
