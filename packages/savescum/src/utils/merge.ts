import type { Options } from '../types'

export function merge(defaultOption: any, userOption: any): Options {
  return Object.assign({}, { ftp: defaultOption }, { savegame: userOption })
}
