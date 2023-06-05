import type {
  AppContextState,
  FetchOptions,
  FtpOptions,
  Route,
  Savegame,
} from '../types'

const STORAGE_KEY = 'SAVESCUM'

const initialRouteOptions: Route = {
  pathname: window.location.pathname || '/',
}

const initialFtpState: FtpOptions = {
  requestType: 'browser',
  ip: '192.168.56.1',
  port: 21,
  user: 'anonymous',
  password: '',
  secure: false,
}

/** Default for debugging */
const initialSavegameState: Savegame[] = [
  {
    idx: 1,
    title: 'Bloodborne',
    profileId: '1ceaa172',
    cusa: 'CUSA00207',
    sdimg: 'sdimg_SPRJ0005',
    createdAt: new Date().getTime(),
    isActive: true,
  },
  {
    idx: 2,
    title: 'Dark Souls III',
    profileId: '1ceaa172',
    cusa: 'CUSA03365',
    sdimg: 'sdimg_EP0700',
    createdAt: new Date().getTime(),
    isActive: false,
  },
]

export const initialFetchState: FetchOptions = {
  response: undefined,
  isPending: false,
  error: undefined,
}

const initialState: AppContextState = {
  fetch: initialFetchState,
  router: initialRouteOptions,
  ftp: initialFtpState,
  savegames: initialSavegameState,
}

export {
  initialSavegameState,
  initialFtpState,
  initialRouteOptions,
  initialState,
  STORAGE_KEY,
}
