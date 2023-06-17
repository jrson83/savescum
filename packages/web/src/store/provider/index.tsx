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
    try {
      const persistedData = localStorage.getItem(STORAGE_KEY)
      return persistedData
        ? Object.assign({}, JSON.parse(persistedData), {
            fetch: { error: undefined },
            router: { pathname: window.location.pathname },
          })
        : state
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  })

  useEffect(() => {
    if (isMounted()) localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state.ftp, state.savegames])

  useLayoutEffect(() => {
    const handleRouteChange = (e: PopStateEvent) => {
      const { location } = e.currentTarget as Window

      if (location.pathname !== state.router.pathname) {
        dispatch({
          type: 'router/navigate',
          payload: { pathname: location.pathname },
        })
      }
    }

    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [state.router])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
