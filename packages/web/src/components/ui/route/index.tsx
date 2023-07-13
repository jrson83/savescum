import { useHistory, useMatch, useRouter } from '@/hooks'
import type { RouteType } from '@/types'

const Route: RouteType = ({ exact = false, component: Component, path }) => {
  const { pathname } = useRouter()
  const history = useHistory()
  const match = useMatch(path, pathname)

  const isMatch = exact ? pathname === path : !!match

  if (!isMatch || !match) return null

  return <Component history={history} location={match} />
}

export { Route }
