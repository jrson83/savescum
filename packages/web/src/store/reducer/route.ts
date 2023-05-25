import type { AppContextAction, Route } from '../'
import type { Reducer } from 'preact/hooks'

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
