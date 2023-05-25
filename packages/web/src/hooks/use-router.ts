import { AppContext } from '@/store'
import { useContext } from 'preact/hooks'

const useRouter = () => {
  const {
    state: { router },
  } = useContext(AppContext)

  if (router === null) {
    throw new Error('useRouter must be used within an AppContextProvider')
  }

  return router
}

export { useRouter }
