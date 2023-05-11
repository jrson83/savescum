import { program } from '@commander-js/extra-typings'
import { homedir } from 'node:os'
import { resolve } from 'node:path'
import { description, name, version } from '../package.json'
import {
  backupCommand,
  restoreCommand,
  serveCommand,
  testCommand,
} from './commands'
import type { ServerOptions } from './types'
import { merge } from './utils'

program.name(name).description(description).version(version)

program
  .command('serve', { isDefault: true })
  .description('serve webinterface (default: http://127.0.0.1:3000)')
  .option('-H, --host <string>', 'webinterface host', String, '127.0.0.1')
  .option('-p, --port <number>', 'webinterface port', parseInt, 3000)
  .option('-o, --open', 'open webinterface in default browser', Boolean, false)
  .option('-l, --log', 'enable debug logging server events', Boolean, true)
  .action(async (options: ServerOptions) => {
    await serveCommand(options)
  })

const ftp = program
  .command('ftp')
  .description('perform ftp operations through cli')
  .configureHelp({ showGlobalOptions: true })
  //.enablePositionalOptions()
  .requiredOption('-i, --ip <string>', 'ps4 ftp-server ip address (required)')
  .option('-p, --port <number>', 'ps4 ftp-server port', parseInt, 2121)
  .option('-u, --user <string>', 'ps4 ftp-server username', String, 'anonymous')
  .option('-P, --password <string>', 'ps4 ftp-server password', String, '')
  .option('-s, --secure', 'explicit ftps over tls', false)
  .option('-n, --no-sound', 'disable playing notification sound')
  .option('-d, --debug', 'enable debug logging ftp server events', false)

ftp
  .command('test', { isDefault: true })
  .description('test connection to ps4 ftp-server')
  .action(async (_options, cmd) => {
    await testCommand(cmd)
  })
  .addHelpText(
    'after',
    `
  Example:
    $ savescum ftp --ip=192.168.179.69 test
    $ savescum ftp --ip=192.168.179.69 --port=21 --no-sound --debug test`
  )

ftp
  .command('backup')
  .description('create save-game backup from ps4 ftp-server')
  .requiredOption('-p, --profile-id <string>', '(required) psn account id')
  .requiredOption(
    '-c, --cusa <string>',
    '(required) game title id type & number'
  )
  .requiredOption('-s, --sdimg <string>', '(required) save-game file')
  .option(
    '-b, --backup-path <string>',
    'local path to store backups',
    resolve(homedir(), 'savescum')
  )
  .action(async (options) => {
    const opts = merge(ftp.opts(), options)
    await backupCommand(opts)
  })
  .addHelpText(
    'after',
    `
  Example (Bloodborne savegame):
    $ savescum ftp --ip=192.168.179.69 backup --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005
    $ savescum ftp --ip=192.168.179.69 --port=41 --no-sound backup --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005`
  )

ftp
  .command('restore')
  .description('restore save-game backup to ps4 ftp-server')
  .requiredOption('-p, --profile-id <string>', '(required) psn account id')
  .requiredOption(
    '-c, --cusa <string>',
    '(required) game title id type & number'
  )
  .requiredOption('-s, --sdimg <string>', '(required) save-game file')
  .option(
    '-b, --backup-path <string>',
    'local path to store backups',
    resolve(homedir(), 'savescum')
  )
  .action(async (options) => {
    const opts = merge(ftp.opts(), options)
    await restoreCommand(opts)
  })
  .addHelpText(
    'after',
    `
  Example (Bloodborne savegame):
    $ savescum ftp --ip=192.168.179.69 restore --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005
    $ savescum ftp --ip=192.168.179.69 --port=41 --no-sound restore --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005`
  )

/* program.addCommand(ftp) */

program.parseAsync(process.argv)
