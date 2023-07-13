import type {
  FetchErrorAction,
  FetchFulfilledAction,
  FetchPendingAction,
  FtpResetAction,
  FtpSaveAction,
  FtpTestAction,
  RouterNavigateAction,
  RouterRedirectAction,
  SavegameAddAction,
  SavegameEditAction,
  SavegameSeleteAction,
} from '../actions'

export interface Route {
  pathname: string
}

export interface FtpOptions {
  ip: string
  port: number
  user: string
  password: string
  requestType: 'browser'
}

export interface Savegame {
  id: number
  title: string
  profileId: string
  cusa: string
  sdimg: string
  createdAt: number
}

export interface SavegameHistory {
  history: Array<{
    id: number
    timestamp: string
    mtime: number
    size: string
  }>
}

export type SavegameDetailed = Savegame & SavegameHistory

export interface DefaultResponse {
  success: boolean
  message: string
}

export type SavegameResponse = DefaultResponse & {
  savegame: SavegameDetailed
}

export interface FetchOptions {
  response?: SavegameResponse
  isPending: boolean
  error?: string
}

export type AppContextState = {
  fetch: FetchOptions
  router: Route
  ftp: FtpOptions
  savegames: Savegame[]
}

export type TAppContext = {
  state: AppContextState
  dispatch: (action: AppContextAction) => void
}

export type Dispatch<A> = (value: A) => void
export type SetStateAction<S> = S | ((prevState: S) => S)

export type AppContextAction =
  | RouterNavigateAction
  | RouterRedirectAction
  | FtpSaveAction
  | FtpResetAction
  | FtpTestAction
  | SavegameAddAction
  | SavegameEditAction
  | SavegameSeleteAction
  | FetchErrorAction
  | FetchFulfilledAction
  | FetchPendingAction
