import { colorize } from './colorize'
import { logSymbols } from './logSymbols'

function success(msg: string) {
  console.log(logSymbols.success, colorize.green(msg))
}

function error(msg: string) {
  console.log(logSymbols.error, colorize.red(msg))
}

function info(msg: string) {
  console.log(logSymbols.info, colorize.blue(msg))
}

function warning(msg: string) {
  console.log(logSymbols.warning, colorize.yellow(msg))
}

function message(msg: string) {
  console.log(' ', msg)
}

export { error, info, message, success, warning }
