import type {
  FetchOptions,
  FtpOptions,
  Route,
  Savegame,
  SavegameResponse,
} from '../types'

type Reducers = 'router' | 'fetch' | 'ftp' | 'savegame'

interface Action {
  type: `${Reducers}/${string}`
  payload: unknown
}

export interface RouterNavigateAction extends Action {
  type: 'router/navigate'
  payload: Route
}

export interface RouterRedirectAction extends Action {
  type: 'router/redirect'
  payload: Route
}

export interface FetchPendingAction extends Action {
  type: 'fetch/pending'
  payload: FetchOptions
}

export interface FetchFulfilledAction extends Action {
  type: 'fetch/fulfilled'
  payload: SavegameResponse
}

export interface FetchErrorAction extends Action {
  type: 'fetch/error'
  payload: string
}

export interface FtpSaveAction extends Action {
  type: 'ftp/save'
  payload: FtpOptions
}

export interface FtpResetAction extends Action {
  type: 'ftp/reset'
  payload: FtpOptions
}

export interface FtpTestAction extends Action {
  type: 'ftp/test'
  payload: FtpOptions
}

export interface SavegameAddAction extends Action {
  type: 'savegame/add'
  payload: Omit<Savegame, 'idx'>
}

export interface SavegameSeleteAction extends Action {
  type: 'savegame/delete'
  payload: Pick<Savegame, 'idx'>
}

export interface SavegameToggleAction extends Action {
  type: 'savegame/toggle'
  payload: Pick<Savegame, 'idx'>
}

export * from './fetch'
