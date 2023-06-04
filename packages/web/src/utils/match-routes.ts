import { pathToRegexp } from './path-to-regexp'

function matchRoutes(href: string, pathname: string) {
  const pattern = pathToRegexp(href)

  /* const id = pattern.exec(pathname)?.groups?.id */
  /* const match = pattern.test(pathname) */

  let match = pathname.match(pattern)

  if (!match) return null

  const matchedPathname = match[0]
  const captureGroups = match.groups

  /* const params = match.slice(1) */

  // todo: decodeURIComponent

  return {
    params: captureGroups,
    pattern,
    pathname: matchedPathname,
  }
}

export { matchRoutes }
