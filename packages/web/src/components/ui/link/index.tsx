import { useHistory, useRouter } from '@/hooks'
import type { LinkFC } from '@/types'
import { matchRoutes } from '@/utils'

export const Link: LinkFC = ({ children, ...props }) => {
  const { pathname } = useRouter()
  const history = useHistory()

  const handleOnClick = (event: MouseEvent) => {
    if (
      props.target === '_blank' ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.shiftKey ||
      event.button !== 0
    ) {
      return
    }

    event.preventDefault()

    history.push(props.href as string)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  const isActive =
    props.href && matchRoutes(props.href as string, pathname) !== null

  return (
    <a
      {...props}
      className={[
        props.className && props.className,
        isActive && props.activeClassName,
      ]
        .filter((e) => !!e)
        .join(' ')}
      // biome-ignore lint/a11y/useValidAnchor: <explanation>
      onClick={handleOnClick}
    >
      {children}
    </a>
  )
}
