import { startServer } from '../server'
import type { ServeOptions } from '../types'
import { colorize, getServerAddresses, info, success } from '../utils'

export async function serveCommand(options: ServeOptions): Promise<void> {
  info('Running serve ...')

  await startServer(options)

  if (options.host === '0.0.0.0') {
    const addresses = getServerAddresses()

    addresses.forEach(({ address, internal }) => {
      console.log(
        `  ${colorize.green('➜')} ${
          internal ? 'Local:  ' : 'Network:'
        } ${colorize.cyan(`http://${address}:${options.port}`)}`
      )
    })
  } else {
    success(`Server listening at http://${options.host}:${options.port}\n`)
  }
}
