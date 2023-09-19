import type { Reducer } from 'preact/hooks'
import type { AppContextAction, FetchOptions } from '../types'

const fetchReducer: Reducer<FetchOptions, AppContextAction> = (
  state,
  { payload, type }
) => {
  switch (type) {
    case 'fetch/pending':
      return {
        ...state,
        isPending: true,
      }
    case 'fetch/fulfilled':
      return {
        ...state,
        response: payload,
        isPending: false,
        error: undefined,
      }
    case 'fetch/error':
      return {
        ...state,
        isPending: false,
        error: payload,
      }
    default:
      return state
  }
}

export { fetchReducer }
