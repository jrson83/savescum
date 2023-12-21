import { homedir } from 'node:os'
import { resolve } from 'node:path'
import { Option, program } from '@commander-js/extra-typings'
import { description, name, version } from '../package.json'
import {
  backupCommand,
  ensureCommand,
  profilesCommand,
  restoreCommand,
  serveCommand,
  testCommand,
} from './commands'
import type { ServeOptions } from './types'
import { generateHelperText, merge } from './utils'

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
  .requiredOption('-i, --ip <string>', 'ftp-server ip address (required)')
  .addOption(
    new Option('-p, --port <number>', 'ftp-server port')
      .default(2121)
      .argParser((i) => parseInt(i, 10))
  )
  .option('-u, --user <string>', 'ftp-server username', String, 'anonymous')
  .option('-P, --password <string>', 'ftp-server password', String, '')
  .option('-n, --no-sound', 'disable playing notification sound')
  .option('-d, --debug', 'enable debug logging ftp server events', false)
  .addOption(
    new Option('--requestType').implies({ requestType: 'node' }).hideHelp()
  )

ftp
  .command('test', { isDefault: true })
  .description('test connection to ftp-server')
  .action(async (_options, cmd) => {
    await testCommand(cmd)
  })
  .addHelpText('after', generateHelperText('test'))

ftp
  .command('ensure')
  .description('ensure save-game exists on ftp-server')
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
  .addHelpText('after', generateHelperText('ensure'))

ftp
  .command('backup')
  .description('create save-game backup from ftp-server')
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
  .addHelpText('after', generateHelperText('backup'))

ftp
  .command('restore')
  .description('restore save-game backup to ftp-server')
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
  .addHelpText('after', generateHelperText('restore'))

ftp
  .command('profiles')
  .description('list all psn profiles/accounts from ftp-server')
  .action(async (_options, cmd) => {
    await profilesCommand(cmd)
  })
  .addHelpText('after', generateHelperText('profiles'))

program.parseAsync(process.argv)
