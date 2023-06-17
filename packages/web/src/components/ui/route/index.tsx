import { useHistory, useMatch, useRouter } from '@/hooks'
import type { History } from '@/types'
import { useEffect } from 'preact/hooks'

export interface RouteComponentProps {
  history: History
  location: {
    params?: Record<string, string>
    pattern: RegExp
    pathname: string
  }
}

type RouteProps = {
  component: FunctionComponent<RouteComponentProps>
  path: string
  exact?: boolean
}

const Route: FunctionComponent<RouteProps> = ({
  exact = false,
  component: Component,
  path,
}) => {
  const { pathname } = useRouter()
  const history = useHistory()
  const match = useMatch(path, pathname)

  const isMatch = exact ? pathname === path : !!match

  useEffect(() => {
    /* console.log(match) */
  }, [])

  if (!isMatch || !match) return null

  return <Component history={history} location={match} />
}

export { Route }
