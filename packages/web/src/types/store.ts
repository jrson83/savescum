export interface UserProfile {
  profileId: string
  username: string
}

export interface PlayStation {
  id: number
  title: string
  ip: string
  port: number
  user: string
  password: string
  users: Array<UserProfile>
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
  history?: Array<{
    id: 'string'
    timestamp: string
    mtime: number
    size: string
  }>
}

export type SavegameDetail = Savegame & SavegameHistory

export interface RequestParams {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
}

export interface DefaultResponse {
  success: boolean
  message: string
}

export type SavegameResponse = DefaultResponse & {
  savegame: SavegameDetailed
}

export type ProfilesResponse = DefaultResponse & {
  profiles: UserProfile[]
}

export type SavegameDetailed = Savegame & SavegameHistory

export type SavegameFormBody = Pick<
  Savegame,
  'title' | 'profileId' | 'cusa' | 'sdimg'
>

export type PlayStationFormBody = Pick<
  PlayStation,
  'title' | 'ip' | 'port' | 'user' | 'password'
>

export type FtpFormBody = Omit<PlayStation, 'requestType'>

export type APISavegameParams = {
  ftp: PlayStation
  savegame: Savegame
}
