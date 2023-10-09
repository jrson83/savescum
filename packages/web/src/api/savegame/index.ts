import type { APISavegameParams, Savegame, SavegameResponse } from '@/types'
import { request } from '../request'

export function ensureSavegame(
  params: APISavegameParams
): Promise<SavegameResponse> {
  return request<SavegameResponse>('/api/ensure', {
    method: 'POST',
    body: params,
  })
}

export function backupSavegame(
  params: APISavegameParams
): Promise<SavegameResponse> {
  return request<SavegameResponse>('/api/backup', {
    method: 'POST',
    body: params,
  })
}

export function restoreSavegame(
  params: APISavegameParams
): Promise<SavegameResponse> {
  return request<SavegameResponse>('/api/restore', {
    method: 'POST',
    body: params,
  })
}

export function getSavegameHistory(
  params: Savegame
): Promise<SavegameResponse> {
  return request<SavegameResponse>('/api/history', {
    method: 'POST',
    body: {
      savegame: params,
    },
  })
}
