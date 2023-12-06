export function dateToPath(currentDate?: Date): string {
  if (currentDate && !(currentDate instanceof Date)) {
    throw new TypeError('Invalid `date` argument. Must pass a date instance.')
  }

  const now = currentDate || new Date(Date.now())

  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(
    2,
    '0'
  )}-${String(now.getDate()).padStart(2, '0')}_${String(
    now.getUTCHours()
  ).padStart(2, '0')}-${String(now.getUTCMinutes()).padStart(2, '0')}-${String(
    now.getUTCSeconds()
  ).padStart(2, '0')}`
}
