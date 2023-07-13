import type { AppContextState, Savegame } from '@/store'
import type { FetchActionType } from '@/types'
import { isDefined } from '@/utils'

const fetchAction = async <T = unknown>(
  type: FetchActionType,
  options: Partial<
    AppContextState & {
      savegame: Savegame
    }
  >
): Promise<T> => {
  if (!isDefined(type))
    throw new TypeError(
      'A Type is required: backup | restore | recent | history'
    )

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
        'X-Savescum': 'true',
        'X-Requested-With': 'savescum-browser',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
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
