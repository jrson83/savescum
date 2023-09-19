import { icons } from '@/data'
import type { IconFC } from '@/types'

const Icon: IconFC = ({ className, color, icon, size = 32, title }) => {
  return (
    <svg
      aria-hidden="true"
      role="img"
      fill={
        color
          ? color.startsWith('#')
            ? color
            : `var(--${color})`
          : 'currentColor'
      }
      fill-rule="evenodd"
      className={className}
      focusable="false"
      width={`${size}px`}
      height={`${size}px`}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 512 512"
      tabIndex={0}
    >
      <title>{title}</title>
      <path d={icons[icon]}></path>
    </svg>
  )
}

export { Icon }
