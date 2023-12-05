import { readdir, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import type { SavegameSchema } from '../types'
import { error } from './messages'

async function getLatestSavegame(options: SavegameSchema): Promise<
  | (SavegameSchema & {
      history: Array<{
        id: number
        timestamp: Date
        mtime: number
        size: string
      }>
    })
  | undefined
> {
  const home = join(homedir(), 'savescum')
  const location = join(
    options.backupPath || home,
    options.profileId,
    options.cusa
  )
  try {
    const latest = await readdir(location, { withFileTypes: true })
      .then((dirs) => dirs.filter((dir) => dir.isDirectory()))
      .then((dirPaths) =>
        Promise.all(
          dirPaths.map(async (path, index) => {
            const fileDetails = await stat(
              resolve(
                options.backupPath || home,
                options.profileId,
                options.cusa,
                path.name,
                options.sdimg
              )
            )

            const { size, mtime, birthtime } = fileDetails

            return {
              id: index + 1,
              timestamp: birthtime,
              mtime: mtime.getTime(),
              size: `${size / (1024 * 1024)}MB`,
            }
          })
        )
      )
      .then((dirs) => dirs.sort((a, b) => b.mtime - a.mtime))

    return {
      profileId: options.profileId,
      cusa: options.cusa,
      sdimg: options.sdimg,
      backupPath: resolve(
        options.backupPath || home,
        options.profileId,
        options.cusa
      ),
      history: latest,
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error(`Error at path ${location}: ${err.message}`)
      throw err
    }
  }
}

export { getLatestSavegame }
