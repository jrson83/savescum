import type { AppContextState } from '@/store'
import type { FetchActionType } from '@/types'
import { isDefined } from '@/utils'

const fetchAction = async <T = unknown>(
  type: FetchActionType,
  options: AppContextState
): Promise<T> => {
  if (!isDefined(type))
    throw new TypeError('A Type is required: backup | restore | recent')

  if (type === 'backup' || type === 'restore' || type === 'recent') {
    const activeSavegame = options.savegames.find(({ isActive }) => {
      return isActive
    })
    options = Object.assign({}, { ...options }, { savegame: activeSavegame })
  }

  const response = await fetch(
    `http://${window.location.hostname || 'localhost'}:${
      window.location.port || 3000
    }/api/${type}`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(options),
    }
  )
    .then((response) => response.json())
    .catch((err: unknown) => {
      if (err instanceof Error) {
        throw err
      }
    })
  return response
}

export { fetchAction }
