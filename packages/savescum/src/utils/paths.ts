import type { SavegameSchema } from '../types'
import { homedir } from 'node:os'
import { format, join } from 'node:path'

export function paths(savegame: SavegameSchema, timestamp?: string) {
  const local = join(
    savegame.backupPath || join(homedir(), 'savescum'),
    savegame.profileId,
    savegame.cusa,
    timestamp ? timestamp : `${Number(new Date())}`,
    savegame.sdimg
  )
  const remote = format({
    dir: `/user/home/${savegame.profileId}/savedata/${savegame.cusa}`,
    base: savegame.sdimg,
  }).replace(/\\/g, '/')

  return {
    ...(timestamp
      ? {
          src: local,
          dest: remote,
        }
      : {
          dest: local,
          src: remote,
        }),
  }
}
