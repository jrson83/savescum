import { AppContext } from '@/store'
import { useContext } from 'preact/hooks'

const useApp = () => {
  const context = useContext(AppContext)

  if (context === null) {
    throw new Error('useApp must be used within an AppContextProvider')
  }

  return context
}

export { useApp }
