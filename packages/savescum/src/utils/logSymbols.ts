/** https://github.com/sindresorhus/log-symbols */

import { colorize } from './colorize'
import { isUnicodeSupported } from './isUnicodeSupported'

const main = {
  info: colorize.blue('ℹ'),
  success: colorize.green('✔'),
  warning: colorize.yellow('⚠'),
  error: colorize.red('✖'),
}

const fallback = {
  info: colorize.blue('i'),
  success: colorize.green('√'),
  warning: colorize.yellow('‼'),
  error: colorize.red('×'),
}

// ✘ ✔

export const logSymbols = isUnicodeSupported() ? main : fallback
