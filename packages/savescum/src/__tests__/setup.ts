import type { FtpSchema, OptionsSchema, SavegameSchema } from '../types'
import { homedir } from 'node:os'
import { join, normalize } from 'node:path'

export const backupPath = normalize(join(homedir(), 'savescum'))
export const cusaPath = normalize(join(backupPath, '1ceaa172', 'CUSA00207'))

export const remoteSavegamePath =
  '/user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005'

export const localSavegamePath = normalize(
  join(backupPath, '1ceaa172', 'CUSA00207', '1685577884592', 'sdimg_SPRJ0005')
)

export const fakeDate = new Date(1685577884592)

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

export const testResponse = {
  success: true,
  message: 'A connection was successfully established with the ftp-server.',
}

export const backupResponse = {
  success: true,
  message: 'Backup operation has been successfully finished.',
  savegame,
}

export const restoreResponse = {
  success: true,
  message: 'Restore operation has been successfully finished.',
  savegame,
}
