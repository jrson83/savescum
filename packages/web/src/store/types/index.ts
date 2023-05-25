import type {
  FtpResetAction,
  FtpSaveAction,
  FtpTestAction,
  RouterNavigateAction,
  RouterRedirectAction,
  SavegameSaveAction,
  SavegameSeleteAction,
  SavegameToggleAction,
} from '../'

export interface Route {
  pathname: string
}

export interface FtpOptions {
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

export type AppContextState = {
  router: Route
  ftp: FtpOptions
  savegames: Savegame[]
}

export type TAppContext = {
  state: AppContextState
  dispatch: (action: AppContextAction) => void
}