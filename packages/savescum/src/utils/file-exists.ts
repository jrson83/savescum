import { stat } from 'node:fs/promises'

export const fileExists = async (path: string) =>
  !!(await stat(path).catch((_e: unknown) => false))
