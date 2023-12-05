export function dateToPath(currentDate?: Date): string {
  if (currentDate && !(currentDate instanceof Date)) {
    throw new TypeError('Invalid `date` argument. Must pass a date instance.')
  }

  const now = currentDate || new Date(Date.now())

  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(now.getDate()).padStart(2, '0')}_${String(
    now.getHours()
  ).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`
}
