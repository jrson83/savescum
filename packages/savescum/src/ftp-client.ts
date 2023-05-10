import { Client } from 'basic-ftp'
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import type { Options } from './types'
import {
  error,
  fileExists,
  getLatestSavegame,
  message,
  paths,
  colorize,
} from './utils'

export class FTPClient {
  static async connect(options: Options['ftp']): Promise<Client> {
    const client = new Client(4000)
    client.ftp.verbose = false /* || options.debug || false */

    try {
      await client.access({
        host: options.ip,
        port: options.port,
        user: options.user,
        password: options.password,
        secure: options.secure,
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message)
        process.exit(0)
      }
    }
    return client
  }

  static async test(options: Options['ftp']) {
    try {
      const client = await FTPClient.connect(options)
      if ((await client.pwd()) === '/') {
        client.close()
        return { status: 200, success: true }
      }
      error(
        `Something went wrong. Could not establish connection to ${options.ip}`
      )
      process.exit(0)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message)
        process.exit(0)
      }
    }
  }

  static async backup(options: Options) {
    const { ftp, savegame } = options
    const { dest, src } = paths(savegame)

    if (ftp.debug) {
      message(`${colorize.dim(`├── Remote Path: ${src}`)}`)
      message(`${colorize.dim(`└── Local Path: ${dest}\n`)}`)
    }

    const client = await FTPClient.connect(ftp)

    try {
      await client.ensureDir(dirname(src))

      await mkdir(dirname(dest), { recursive: true }).catch((err: unknown) => {
        if (err instanceof Error) {
          error(err.message)
          process.exit(0)
        }
      })

      await client.downloadTo(dest, src)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message)
        process.exit(0)
      }
    }

    client.close()

    return {
      status: 200,
      success: true,
      cusa: savegame.cusa,
      sdimg: savegame.sdimg,
    }
  }

  static async restore(options: Options) {
    const { ftp, savegame } = options

    const latestBackup = await getLatestSavegame(savegame)

    const { dest, src } = paths(savegame, latestBackup?.name)

    const localFile = await fileExists(src)

    if (!localFile) {
      error(`The backup file ${dest} does not exist.`)
      process.exit(0)
    }

    if (ftp.debug) {
      message(`${colorize.dim(`├── Local Path: ${src}`)}`)
      message(`${colorize.dim(`└── Remote Path: ${dest}\n`)}`)
    }

    const client = await FTPClient.connect(ftp)

    try {
      await client.ensureDir(dirname(dest))
      await client.uploadFrom(src, dest)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message)
        process.exit(0)
      }
    }

    client.close()

    return {
      status: 200,
      success: true,
      cusa: savegame.cusa,
      sdimg: savegame.sdimg,
    }
  }
}
