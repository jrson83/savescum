import { homedir } from 'node:os'
import { format, join } from 'node:path'
import type { SavegameSchema } from '../types'
import { dateToPath } from './date-to-path'

export function formatPath(savegame: SavegameSchema, timestamp?: Date) {
  const localPath = join(
    savegame.backupPath || join(homedir(), 'savescum'),
    savegame.profileId,
    savegame.cusa,
    timestamp ? dateToPath(timestamp) : dateToPath(),
    savegame.sdimg
  )

  const remotePath = format({
    dir: `/user/home/${savegame.profileId}/savedata/${savegame.cusa}`,
    base: savegame.sdimg,
  }).replace(/\\/g, '/')

  return {
    ...(timestamp
      ? {
          src: localPath,
          dest: remotePath,
        }
      : {
          dest: localPath,
          src: remotePath,
        }),
  }
}
