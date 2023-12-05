/** https://github.com/jrson83/colorize-node */

import { stdout } from 'node:process'
import { inspect } from 'node:util'

type Initializer<T> = T | ((str: string) => T)

const colors = inspect.colors
const hasNoColors = stdout.isTTY && !stdout.hasColors()

export const colorize = Object.fromEntries(
  Object.entries(colors).map(([color, code]) => [
    color,
    <T>(str: string | Initializer<T> | undefined) => {
      if (!code) return ''
      if (hasNoColors) return str
      return `\x1b[${code[0]}m${str}\x1b[${code[1]}m`
    },
  ])
)
