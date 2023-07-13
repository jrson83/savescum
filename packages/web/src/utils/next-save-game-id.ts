import type { Savegame } from '@/store'

const nextSaveGameId = (savegames: Savegame[]): number => {
  const maxId = savegames.reduce(
    (maxId, savegame) => Math.max(savegame.id, maxId),
    -1
  )
  return maxId + 1
}

export { nextSaveGameId }
