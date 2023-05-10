import { startServer } from '../server'
import type { ServerOptions } from '../types'
import { info, success } from '../utils'

export async function serveCommand(options: ServerOptions): Promise<void> {
  info('Running serve ...')

  await startServer(options)

  success(`Server listening at http://${options.host}:${options.port}\n`)
}
