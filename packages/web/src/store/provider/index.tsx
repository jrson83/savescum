import { STORAGE_KEY, TAppContext, initialState, rootReducer } from '../'
import { useIsMounted } from '@/hooks'
import { createContext } from 'preact'
import { useEffect, useLayoutEffect, useReducer } from 'preact/hooks'

const AppContext = createContext<TAppContext>({
  state: initialState,
  dispatch: () => null,
})

const AppContextProvider: FunctionComponent = ({ children }) => {
  const isMounted = useIsMounted()

  const [state, dispatch] = useReducer(rootReducer, initialState, (state) => {
    const persistedData = localStorage.getItem(STORAGE_KEY)
    return persistedData
      ? Object.assign({}, JSON.parse(persistedData), {
          fetch: { error: undefined },
        })
      : state
  })

  useEffect(() => {
    if (isMounted()) localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  useLayoutEffect(() => {
    const handleRouteChange = () => {
      dispatch({
        type: 'router/navigate',
        payload: { pathname: window.location.pathname },
      })
    }

    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
