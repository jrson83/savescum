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
          id: nextSaveGameId(state),
          title: payload.title,
          profileId: payload.profileId,
          cusa: payload.cusa,
          sdimg: payload.sdimg,
          createdAt: payload.createdAt,
        },
      ]
    case 'savegame/edit':
      return state.map((savegame) => {
        if (savegame.id !== payload.id) {
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
    case 'savegame/delete': {
      return state.filter((savegame) => savegame.id !== payload.id)
    }
    default:
      return state
  }
}

export { savegameReducer }
