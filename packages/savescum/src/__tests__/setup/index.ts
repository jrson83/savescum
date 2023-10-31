import { homedir } from 'node:os'
import { join, normalize } from 'node:path'
import { RESPONSE_SUCCESS_MESSAGES } from '../../constants'
import type {
  FtpSchema,
  OptionsSchema,
  Profiles,
  SavegameSchema,
} from '../../types'

const fakeTimestamp = 1685577884592

export const fakeDate = new Date(fakeTimestamp)

export const backupPath = normalize(join(homedir(), 'savescum'))
export const cusaPath = normalize(join(backupPath, '1ceaa172', 'CUSA00207'))

export const remoteSavegamePath =
  '/user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005'

export const localSavegamePath = normalize(
  join(
    backupPath,
    '1ceaa172',
    'CUSA00207',
    `${fakeTimestamp}`,
    'sdimg_SPRJ0005'
  )
)

export const ftp: FtpSchema = {
  requestType: 'browser',
  ip: '192.168.56.1',
  port: 21,
  user: 'anonymous',
  password: '',
  secure: false,
  debug: false,
  sound: true,
}

export const savegame: SavegameSchema = {
  profileId: '1ceaa172',
  cusa: 'CUSA00207',
  sdimg: 'sdimg_SPRJ0005',
  backupPath,
}

export const options: OptionsSchema = {
  ftp,
  savegame,
}

export const profiles: Profiles = [
  {
    profileId: '1bexx117',
    username: 'chiaki',
  },
  {
    profileId: '1ceaa172',
    username: 'AHunterMustHunt',
  },
]

export const testResponse = {
  success: true,
  message: RESPONSE_SUCCESS_MESSAGES.TEST,
}

export const ensureResponse = {
  success: true,
  message: RESPONSE_SUCCESS_MESSAGES.ENSURE,
  savegame,
}

export const backupResponse = {
  success: true,
  message: RESPONSE_SUCCESS_MESSAGES.BACKUP,
  savegame,
}

export const restoreResponse = {
  success: true,
  message: RESPONSE_SUCCESS_MESSAGES.RESTORE,
  savegame,
}

export const profilesResponse = {
  success: true,
  message: RESPONSE_SUCCESS_MESSAGES.PROFILES,
  profiles,
}
