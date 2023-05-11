import { readdir, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import type { Options } from '../types'
import { error } from './messages'

async function getLatestSavegame(options: Options['savegame']) {
  const location = join(options.backupPath, options.profileId, options.cusa)
  try {
    const latest = await readdir(location, { withFileTypes: true })
      .then((dirs) => dirs.filter((dir) => dir.isDirectory()))
      .then((dirPaths) =>
        Promise.all(
          dirPaths.map(async (path) => ({
            name: path.name,
            time: (
              await stat(
                resolve(
                  homedir(),
                  'savescum',
                  options.profileId,
                  options.cusa,
                  path.name
                )
              )
            ).mtime.getTime(),
          }))
        )
      )
      .then((dirs) => dirs.sort((a, b) => b.time - a.time))

    return latest[0]
  } catch (err: unknown) {
    if (err instanceof Error) {
      error(`Error at path ${location}: ${err.message}`)
    }
  }
}

export { getLatestSavegame }
