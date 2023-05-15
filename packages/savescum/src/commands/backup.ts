import { FTPClient } from '../ftp-client'
import type { Options } from '../types'
import { beep, info, success } from '../utils'

export async function backupCommand(options: Options): Promise<void> {
  info('Running backup ...')

  const response = await FTPClient.backup(options)

  if (response.status === 200) {
    success('Backup completed')
    if (options.ftp.sound) await beep()
    process.exit(0)
  }
}
