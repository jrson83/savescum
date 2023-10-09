import type { RequestParams } from '@/types'
import { isDefined } from '@/utils'

async function request<T = unknown>(
  endpoint: string,
  { method = 'GET', body }: RequestParams
): Promise<T> {
  if (!isDefined(endpoint)) throw new TypeError('An endpoint is required.')

  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'X-Savescum': 'true',
    'X-Requested-With': 'savescum-browser',
  })

  const url = /* `http://${window.location.hostname || 'localhost'}:${
    window.location.port || 3000
  }${endpoint}` */ `http://127.0.0.1:3000${endpoint}`

  const response = await fetch(url, {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(body),
  })
    /* .then(async (response) => response.json()) */
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((err: unknown) => {
      console.log('err2', err)
      if (err instanceof Error) {
        throw err
      }
    })
  return response
}

export { request }
