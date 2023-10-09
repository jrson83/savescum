import type { DefaultResponse, PlayStation, ProfilesResponse } from '@/types'
import { request } from '../request'

export function testFtpConnection(
  params: PlayStation
): Promise<DefaultResponse> {
  return request<DefaultResponse>('/api/test', {
    method: 'POST',
    body: {
      ftp: params,
    },
  })
}

export function listProfiles(params: PlayStation): Promise<ProfilesResponse> {
  return request<ProfilesResponse>('/api/profiles', {
    method: 'POST',
    body: {
      ftp: params,
    },
  })
}
