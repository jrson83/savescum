import { error } from './messages'

export function handleError(err: unknown) {
  if (err instanceof Error) {
    error(`${err.name}: ${err.message}`)
    process.exit(1)
  }
}
