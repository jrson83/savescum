import { FTPClient } from '../core'
import type { OptionsSchema } from '../types'
import { beep, info, success } from '../utils'

export async function restoreCommand(options: OptionsSchema): Promise<void> {
  info('Running restore ...')

  const response = await FTPClient.restore(options)

  if (response?.success) {
    success(response.message)
    if (options.ftp.sound) await beep().then(() => process.exit(0))
  }
}
