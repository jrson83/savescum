import type {
  FetchErrorAction,
  FetchFulfilledAction,
  FetchPendingAction,
  FtpResetAction,
  FtpSaveAction,
  FtpTestAction,
  RouterNavigateAction,
  RouterRedirectAction,
  SavegameSaveAction,
  SavegameSeleteAction,
  SavegameToggleAction,
} from '../actions'

export interface Route {
  pathname: string
}

export interface FtpOptions {
  requestType: 'browser' | 'node'
  ip: string
  port: number
  user: string
  password: string
  secure?: boolean
}

export interface Savegame {
  idx: number
  title: string
  profileId: string
  cusa: string
  sdimg: string
  createdAt: number
  isActive: boolean
}

export interface DefaultResponse {
  success: boolean
  message: string
}

export type SavegameResponse = DefaultResponse & {
  savegame?: Savegame
}

export interface FetchOptions {
  response?: DefaultResponse
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
  | SavegameSaveAction
  | SavegameSeleteAction
  | SavegameToggleAction
  | FetchErrorAction
  | FetchFulfilledAction
  | FetchPendingAction
