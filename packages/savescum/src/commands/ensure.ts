import { FTPClient } from '../core'
import type { OptionsSchema } from '../types'
import { beep, info, success } from '../utils'

export async function ensureCommand(options: OptionsSchema): Promise<void> {
  info('Running backup ...')

  const response = await FTPClient.ensure(options)

  if (response?.success) {
    success(response.message)
    if (options.ftp.sound) await beep().then(() => process.exit(0))
  }
}
