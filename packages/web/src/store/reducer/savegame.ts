import type { AppContextAction, Savegame } from '../'
import { nextSaveGameId } from '@/utils'
import type { Reducer } from 'preact/hooks'

const savegameReducer: Reducer<Savegame[], AppContextAction> = (
  state,
  { payload, type }
) => {
  switch (type) {
    case 'savegame/save':
      return [
        ...state,
        {
          idx: nextSaveGameId(state),
          title: payload.title,
          profileId: payload.profileId,
          cusa: payload.cusa,
          sdimg: payload.sdimg,
          createdAt: payload.createdAt,
          isActive: true,
        },
      ]
    case 'savegame/toggle': {
      return state.map((savegame) => {
        if (savegame.idx !== payload.idx) {
          return savegame
        }

        return {
          ...savegame,
          isActive: !savegame.isActive,
        }
      })
    }
    case 'savegame/delete': {
      return state.filter((savegame) => savegame.idx !== payload.idx)
    }
    default:
      return state
  }
}

export { savegameReducer }
