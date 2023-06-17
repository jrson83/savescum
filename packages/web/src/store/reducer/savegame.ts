import type { AppContextAction, Savegame } from '../types'
import { nextSaveGameId } from '@/utils'
import type { Reducer } from 'preact/hooks'

const savegameReducer: Reducer<Savegame[], AppContextAction> = (
  state,
  { payload, type }
) => {
  switch (type) {
    case 'savegame/add':
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
    case 'savegame/edit':
      return state.map((savegame) => {
        if (savegame.idx !== payload.idx) {
          return savegame
        }

        return {
          ...savegame,
          title: payload.title,
          profileId: payload.profileId,
          cusa: payload.cusa,
          sdimg: payload.sdimg,
        }
      })
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
