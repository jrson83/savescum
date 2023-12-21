import { homedir } from 'node:os'
import { join } from 'node:path'
import { RESPONSE_SUCCESS_MESSAGES } from '../constants'
import type {
  FtpSchema,
  OptionsSchema,
  Profiles,
  SavegameSchema,
} from '../types'

// Thu Jun 01 2023 00:04:44 GMT+0000
export const fakeTimestamp = 1685577884592

export const mockDate = new Date(fakeTimestamp)

export const fakeFolder = '2023-06-01_00-04-44'

export const ftp: FtpSchema = {
  requestType: 'browser',
  ip: '192.168.56.1',
  port: 21,
  user: 'anonymous',
  password: '',
  debug: false,
  sound: true,
  profiles: [],
}

export const savegame: SavegameSchema = {
  profileId: '1ceaa172',
  cusa: 'CUSA00207',
  sdimg: 'sdimg_SPRJ0005',
  backupPath: undefined,
}

export const options: OptionsSchema = {
  ftp,
  savegame,
}

export const profiles: Profiles = [
  {
    profileId: '1bexx117',
    username: 'chiaki',
    avatar: 'base64png_chiaki',
  },
  {
    profileId: '1ceaa172',
    username: 'AHunterMustHunt',
    avatar: 'base64png_AHunterMustHunt',
  },
]

export const backupPath = join(homedir(), 'savescum')
export const cusaPath = join(backupPath, savegame.profileId, savegame.cusa)

export const remoteSavegamePath = `/user/home/${savegame.profileId}/savedata/${savegame.cusa}/${savegame.sdimg}`

export const localSavegamePath = join(
  backupPath,
  savegame.profileId,
  savegame.cusa,
  fakeFolder,
  savegame.sdimg
)

export const testResponse = {
  success: true,
  message: RESPONSE_SUCCESS_MESSAGES.TEST,
}

export const ensureResponse = {
  success: true,
  message: RESPONSE_SUCCESS_MESSAGES.ENSURE,
  savegame: {
    ...savegame,
    backupPath: localSavegamePath,
  },
}

export const backupResponse = {
  success: true,
  message: RESPONSE_SUCCESS_MESSAGES.BACKUP,
  savegame: {
    ...savegame,
    backupPath: localSavegamePath,
  },
}

export const restoreResponse = {
  success: true,
  message: RESPONSE_SUCCESS_MESSAGES.RESTORE,
  savegame: {
    ...savegame,
    backupPath: remoteSavegamePath,
  },
}

export const profilesResponse = {
  success: true,
  message: RESPONSE_SUCCESS_MESSAGES.PROFILES,
  profiles,
}

export const historyResponse = {
  success: true,
  message: RESPONSE_SUCCESS_MESSAGES.HISTORY,
  savegame: {
    ...savegame,
    backupPath: cusaPath,
    history: [
      {
        id: 1,
        mtime: fakeTimestamp,
        size: '0.000003814697265625MB',
        timestamp: mockDate.toString(),
      },
    ],
  },
}
