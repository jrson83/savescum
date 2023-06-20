import { description, name, version } from '../package.json'
import {
  backupCommand,
  ensureCommand,
  restoreCommand,
  serveCommand,
  testCommand,
} from './commands'
import type { ServeOptions } from './types'
import { merge } from './utils'
import { Option, program } from '@commander-js/extra-typings'
import { homedir } from 'node:os'
import { resolve } from 'node:path'

program.name(name).description(description).version(version)

program
  .command('serve', { isDefault: true })
  .description('serve webinterface (default: http://127.0.0.1:3000)')
  .option('-H, --host <string>', 'webinterface host', String, '127.0.0.1')
  .addOption(
    new Option('-p, --port <number>', 'webinterface port')
      .default(3000)
      .argParser((i) => parseInt(i, 10))
  )
  // todo
  .addOption(
    new Option('-o, --open', 'open webinterface in default browser')
      .default(false)
      .argParser((i) => (i === 'false' ? false : true))
  )
  .addOption(
    new Option('-l, --log', 'enable debug logging server events')
      .default(false)
      .argParser((i) => (i === 'false' ? false : true))
  )
  .action(async (options: ServeOptions) => {
    await serveCommand(options)
  })

const ftp = program
  .command('ftp')
  .description('perform ftp operations through cli')
  .configureHelp({ showGlobalOptions: true })
  //.enablePositionalOptions()
  .requiredOption('-i, --ip <string>', 'ps4 ftp-server ip address (required)')
  .addOption(
    new Option('-p, --port <number>', 'ps4 ftp-server port')
      .default(2121)
      .argParser((i) => parseInt(i, 10))
  )
  .option('-u, --user <string>', 'ps4 ftp-server username', String, 'anonymous')
  .option('-P, --password <string>', 'ps4 ftp-server password', String, '')
  .option('-s, --secure', 'explicit ftps over tls', false)
  .option('-n, --no-sound', 'disable playing notification sound')
  .option('-d, --debug', 'enable debug logging ftp server events', false)
  .addOption(
    new Option('--requestType').implies({ requestType: 'node' }).hideHelp()
  )

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
  .command('ensure')
  .description('ensure save-game exists on ps4 ftp-server')
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
    await ensureCommand(opts).then(() => process.exit(0))
  })
  .addHelpText(
    'after',
    `
  Example (Bloodborne savegame):
    $ savescum ftp --ip=192.168.179.69 ensure --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005
    $ savescum ftp --ip=192.168.179.69 --port=41 --no-sound ensure --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005`
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
    await backupCommand(opts).then(() => process.exit(0))
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
    await restoreCommand(opts).then(() => process.exit(0))
  })
  .addHelpText(
    'after',
    `
  Example (Bloodborne savegame):
    $ savescum ftp --ip=192.168.179.69 restore --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005
    $ savescum ftp --ip=192.168.179.69 --port=41 --no-sound restore --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005`
  )

program.parseAsync(process.argv)
