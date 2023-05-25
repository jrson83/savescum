import { matchRoutes } from '@/utils'

const useMatch = (href: string, pathname: string) => {
  const match = matchRoutes(href, pathname)

  if (!match) return null

  return match
}

export { useMatch }
