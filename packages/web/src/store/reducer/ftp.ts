import { type AppContextAction, type FtpOptions, initialFtpState } from '../'
import type { Reducer } from 'preact/hooks'

const ftpReducer: Reducer<FtpOptions, AppContextAction> = (
  state,
  { payload, type }
) => {
  switch (type) {
    case 'ftp/save':
      return {
        ...state,
        ip: payload.ip,
        port: payload.port,
        user: payload.user,
        password: payload.password,
        secure: false,
      }
    case 'ftp/reset':
      return {
        ...state,
        ...initialFtpState,
      }
    case 'ftp/test':
      return {
        ...state,
        ...initialFtpState,
      }
    default:
      return state
  }
}

export { ftpReducer }
