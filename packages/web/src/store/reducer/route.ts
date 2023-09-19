import type { Reducer } from 'preact/hooks'
import type { AppContextAction, Route } from '../types'

const routeReducer: Reducer<Route, AppContextAction> = (
  state,
  { payload, type }
) => {
  switch (type) {
    case 'router/navigate':
      return {
        ...state,
        pathname: payload.pathname,
      }
    default:
      return state
  }
}

export { routeReducer }
