import type { OptionsSchema } from '../types'

export function merge(defaultOption: any, userOption: any): OptionsSchema {
  return Object.assign({}, { ftp: defaultOption }, { savegame: userOption })
}
