import type { AppContextAction, AppContextState } from '../'
import { fetchReducer } from './fetch'
import { ftpReducer } from './ftp'
import { routeReducer } from './route'
import { savegameReducer } from './savegame'

const rootReducer = (
  { fetch, ftp, router, savegames }: AppContextState,
  action: AppContextAction
) => ({
  fetch: fetchReducer(fetch, action),
  router: routeReducer(router, action),
  ftp: ftpReducer(ftp, action),
  savegames: savegameReducer(savegames, action),
})

export { rootReducer }
