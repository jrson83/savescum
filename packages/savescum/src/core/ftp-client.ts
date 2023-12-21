import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { PassThrough } from 'node:stream'
import { Client, type FileInfo } from 'basic-ftp'
import { RESPONSE_SUCCESS_MESSAGES } from '../constants'
import type {
  FtpSchema,
  OptionsSchema,
  Profile,
  SDIMG,
  SaveData,
} from '../types'
import {
  colorize,
  error,
  fileExists,
  formatPath,
  message,
  streamToBuffer,
  streamToString,
} from '../utils'
import { NodeClient } from './node-client'

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
        secure: false,
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
          message: RESPONSE_SUCCESS_MESSAGES.TEST,
        }
      }
      error(
        `Something went wrong. Could not establish connection to ${options.ip}`
      )
      if (options.requestType === 'node') process.exit(0)
      throw new Error(
        `Something went wrong. Could not establish connection to ${options.ip}`
      )
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
    const { dest, src } = formatPath(savegame)

    if (ftp.debug) {
      message(`${colorize.dim(`├── Remote Path: ${src}`)}`)
      message(`${colorize.dim(`└── Local Path: ${dest}\n`)}`)
    }

    const client = await FTPClient.connect(ftp)

    try {
      await client.size(src)
      return {
        success: true,
        message: RESPONSE_SUCCESS_MESSAGES.ENSURE,
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
    const { dest, src } = formatPath(savegame)

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
      message: RESPONSE_SUCCESS_MESSAGES.BACKUP,
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

    const latestBackup = await NodeClient.history(savegame)

    const { dest, src } = formatPath(
      savegame,
      new Date(`${latestBackup?.savegame.history[0].timestamp}`)
    )

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
      message: RESPONSE_SUCCESS_MESSAGES.RESTORE,
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

      if (options.debug) {
        message(`${colorize.dim(`└── RawProfiles: ${rawProfiles}\n`)}`)
      }

      if (Array.isArray(rawProfiles) && rawProfiles.length > 0) {
        const getUsername = async (profile: FileInfo) => {
          const stream = new PassThrough()

          await client.downloadTo(
            stream,
            `/user/home/${profile.name}/username.dat`
          )

          const username = await streamToString(stream)

          return {
            profileId: profile.name,
            username: username,
          }
        }

        const getAvatar = async (filePath: string) => {
          const stream = new PassThrough()

          client.downloadTo(stream, filePath)

          const avatar = await streamToBuffer(stream)

          return avatar.toString('base64')
        }

        const getSaveData = async (profile: FileInfo) => {
          const rawSaveData = await client.list(
            `/user/home/${profile.name}/savedata`
          )

          const saveData: SaveData = []

          if (Array.isArray(rawSaveData) && rawSaveData.length > 0) {
            for (const data of rawSaveData) {
              if (
                data.type === 2 &&
                !data.name.startsWith('.') &&
                data.name !== 'LAPY20009' &&
                data.name !== 'GOLD00777' &&
                data.name !== 'sce_backup2' &&
                data.name !== 'APOL00004'
              ) {
                const rawFiles = await client.list(
                  `/user/home/${profile.name}/savedata/${data.name}`
                )

                const files: SDIMG = []

                if (Array.isArray(rawFiles) && rawFiles.length > 0) {
                  for (const file of rawFiles) {
                    if (!file.name.endsWith('.bin')) {
                      files.push({
                        name: file.name,
                        size: file.size,
                      })
                    }
                  }
                }

                saveData.push({
                  cusa: data.name,
                  sdimg: files,
                })
              }
            }
          }

          return saveData
        }

        const profiles: Profile[] = []

        for (const profile of rawProfiles) {
          const resolvedProfile = await getUsername(profile)

          const filePath = `/system_data/priv/cache/profile/0x${resolvedProfile.profileId.toUpperCase()}/avatar.png`

          try {
            await client.size(filePath)
          } catch (err: unknown) {
            if ((err as { code: number }).code === 550) {
              throw err
            }
          }

          const avatar = await getAvatar(filePath)

          const saveData = await getSaveData(profile)

          profiles.push({
            ...resolvedProfile,
            avatar: avatar,
            savedata: saveData,
          })
        }

        return {
          success: true,
          message: RESPONSE_SUCCESS_MESSAGES.PROFILES,
          profiles,
        }
      }

      error('Could not find any profiles in /user/home')
      process.exit(1)
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
