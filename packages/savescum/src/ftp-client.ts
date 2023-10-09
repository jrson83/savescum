import { Buffer } from 'node:buffer'
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { PassThrough } from 'stream'
import { Client } from 'basic-ftp'
import type { FtpSchema, OptionsSchema } from './types'
import {
  colorize,
  error,
  fileExists,
  getLatestSavegame,
  message,
  paths,
} from './utils'

export class FTPClient {
  static async connect(options: FtpSchema): Promise<Client> {
    const client = new Client(4000)
    client.ftp.verbose = options.debug || false

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
        if (options.requestType === 'node') process.exit(0)
        throw err
      }
    }
    return client
  }

  static async test(options: FtpSchema) {
    const client = await FTPClient.connect(options)
    try {
      if ((await client.pwd()) === '/') {
        return {
          success: true,
          message:
            'A connection was successfully established with the ftp-server.',
        }
      }
      error(
        `Something went wrong. Could not establish connection to ${options.ip}`
      )
      process.exit(0)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message)
        if (options.requestType === 'node') process.exit(0)
        throw err
      }
    } finally {
      if (!client.closed) client.close()
    }
  }

  static async ensure(options: OptionsSchema) {
    const { ftp, savegame } = options
    const { dest, src } = paths(savegame)

    if (ftp.debug) {
      message(`${colorize.dim(`├── Remote Path: ${src}`)}`)
      message(`${colorize.dim(`└── Local Path: ${dest}\n`)}`)
    }

    const client = await FTPClient.connect(ftp)

    try {
      await client.size(src)
      return {
        success: true,
        message: 'Ensure operation has been successfully finished.',
        savegame: {
          profileId: savegame.profileId,
          cusa: savegame.cusa,
          sdimg: savegame.sdimg,
          backupPath: savegame.backupPath || dest,
        },
      }
    } catch (err: unknown) {
      if ((err as { code: number }).code === 550) {
        throw err
      }
    } finally {
      if (!client.closed) client.close()
    }
  }

  static async backup(options: OptionsSchema) {
    const { ftp, savegame } = options
    const { dest, src } = paths(savegame)

    if (ftp.debug) {
      message(`${colorize.dim(`├── Remote Path: ${src}`)}`)
      message(`${colorize.dim(`└── Local Path: ${dest}\n`)}`)
    }

    const client = await FTPClient.connect(ftp)

    try {
      await client.size(src)
    } catch (err: unknown) {
      if ((err as { code: number }).code === 550) {
        throw err
      }
    }

    try {
      await mkdir(dirname(dest), { recursive: true }).catch((err: unknown) => {
        if (err instanceof Error) {
          error(err.message)
          if (ftp.requestType === 'node') process.exit(0)
          throw err
        }
      })

      await client.downloadTo(dest, src)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message)
        if (ftp.requestType === 'node') process.exit(0)
        throw err
      }
    } finally {
      if (!client.closed) client.close()
    }

    return {
      success: true,
      message: 'Backup operation has been successfully finished.',
      savegame: {
        profileId: savegame.profileId,
        cusa: savegame.cusa,
        sdimg: savegame.sdimg,
        backupPath: savegame.backupPath || dest,
      },
    }
  }

  static async restore(options: OptionsSchema) {
    const { ftp, savegame } = options

    const latestBackup = await getLatestSavegame(savegame)

    const { dest, src } = paths(savegame, latestBackup?.history[0].timestamp)

    const localFile = await fileExists(src)

    if (!localFile) {
      error(`The backup file ${src} does not exist.`)
      if (ftp.requestType === 'node') process.exit(0)
    }

    if (ftp.debug) {
      message(`${colorize.dim(`├── Local Path: ${src}`)}`)
      message(`${colorize.dim(`└── Remote Path: ${dest}\n`)}`)
    }

    const client = await FTPClient.connect(ftp)

    try {
      await client.uploadFrom(src, dest)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message)
        if (ftp.requestType === 'node') process.exit(0)
        throw err
      }
    } finally {
      if (!client.closed) client.close()
    }

    return {
      success: true,
      message: 'Restore operation has been successfully finished.',
      savegame: {
        profileId: savegame.profileId,
        cusa: savegame.cusa,
        sdimg: savegame.sdimg,
        backupPath: savegame.backupPath || dest,
      },
    }
  }

  static async profiles(options: FtpSchema) {
    const client = await FTPClient.connect(options)

    try {
      await client.cd('/user/home')

      const rawProfiles = await client.list()

      if (Array.isArray(rawProfiles) && rawProfiles.length > 0) {
        const profiles: Array<{
          profileId: string
          username: string | undefined
        }> = rawProfiles.map((profile) => {
          return {
            profileId: profile.name,
            username: undefined,
          }
        })

        await profiles.reduce(async (promise, profile) => {
          await promise

          const chunks: Buffer[] = []
          const stream = new PassThrough()

          stream.on('data', (chunk) => {
            chunks.push(chunk)
          })

          stream.once('end', () => {
            const buffer = Buffer.concat(chunks).subarray(0, 16)
            let bufferSize = buffer.indexOf(0x00)

            if (bufferSize === -1) bufferSize = buffer.length

            profile.username = Buffer.concat(chunks, bufferSize).toString(
              'utf-8'
            )
          })

          await client.downloadTo(stream, `${profile.profileId}/username.dat`)
        }, Promise.resolve())

        return {
          success: true,
          message: 'Profiles operation has been successfully finished.',
          profiles,
        }
      }

      error(`Could not find any profiles in /user/home.`)
      process.exit(0)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error(err.message)
        if (options.requestType === 'node') process.exit(0)
        throw err
      }
    } finally {
      if (!client.closed) client.close()
    }
  }
}
