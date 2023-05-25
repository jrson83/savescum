import type { AppContextAction, AppContextState } from '../'
import { ftpReducer } from './ftp'
import { routeReducer } from './route'
import { savegameReducer } from './savegame'

const rootReducer = (
  { ftp, router, savegames }: AppContextState,
  action: AppContextAction
) => ({
  router: routeReducer(router, action),
  ftp: ftpReducer(ftp, action),
  savegames: savegameReducer(savegames, action),
})

export { rootReducer }
