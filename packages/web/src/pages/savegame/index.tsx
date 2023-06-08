import { useApp, useMatch, useRouter } from '@/hooks'
import {
  type DefaultResponse,
  type SavegameResponse,
  fetchAction,
} from '@/store'
import { timeAgo } from '@/utils'
import { useEffect } from 'preact/hooks'

export const SavegamePage = () => {
  const { state, dispatch } = useApp()
  const { pathname } = useRouter()
  const match = useMatch('/savegame/:id', pathname)

  const activeSave = state.savegames.find(({ idx }) => {
    return idx === parseInt(match?.params?.id as string)
  })

  const handleBackup = async (e: Event) => {
    e.preventDefault()
    if (!state.fetch.isPending) {
      dispatch({
        type: 'fetch/pending',
        payload: {
          isPending: true,
        },
      })

      try {
        const req = await fetchAction<SavegameResponse>('backup', state)
        dispatch({ type: 'fetch/fulfilled', payload: req })
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch({ type: 'fetch/error', payload: err.message })
        }
      }
    }
  }

  const handleRestore = async (e: Event) => {
    e.preventDefault()
    if (!state.fetch.isPending) {
      dispatch({
        type: 'fetch/pending',
        payload: {
          isPending: true,
        },
      })

      try {
        const req = await fetchAction<SavegameResponse>('restore', state)
        dispatch({ type: 'fetch/fulfilled', payload: req })
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch({ type: 'fetch/error', payload: err.message })
        }
      }
    }
  }

  const handleActiveSavegame = async () => {
    if (!state.fetch.isPending) {
      dispatch({
        type: 'fetch/pending',
        payload: {
          isPending: true,
        },
      })

      try {
        const req = await fetchAction<SavegameResponse>('recent', state)
        dispatch({ type: 'fetch/fulfilled', payload: req })
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch({ type: 'fetch/error', payload: err.message })
        }
      }
    }
  }

  const handleFtpTest = async (e: Event) => {
    e.preventDefault()
    if (!state.fetch.isPending) {
      dispatch({
        type: 'fetch/pending',
        payload: {
          isPending: true,
        },
      })

      try {
        const req = await fetchAction<DefaultResponse>('test', state)
        dispatch({ type: 'fetch/fulfilled', payload: req })
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch({ type: 'fetch/error', payload: err.message })
        }
      }
    }
  }

  const getBackupHistory = async () => {
    if (!state.fetch.isPending) {
      dispatch({
        type: 'fetch/pending',
        payload: {
          isPending: true,
        },
      })

      try {
        const req = await fetchAction<SavegameResponse>('history', state)
        dispatch({ type: 'fetch/fulfilled', payload: req })
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch({ type: 'fetch/error', payload: err.message })
        }
      }
    }
  }

  useEffect(() => {
    if (!state.fetch.response) getBackupHistory()
  }, [])

  return (
    <div className='main__content'>
      <h2>{activeSave?.title}</h2>
      {/* <p>Router: {pathname}</p>
      <p>Params: {match?.params?.id}</p> */}
      <hr />
      {!state.fetch.response ? (
        <table>
          <caption style='text-align:left'>
            <h3>Backup History</h3>
          </caption>
        </table>
      ) : (
        <table>
          <caption style='text-align:left'>
            <h3>Backup History</h3>
          </caption>
          <thead>
            <tr>
              <th scope='col'>File Name</th>
              <th scope='col'>Creation Time</th>
              <th scope='col'>File Size</th>
            </tr>
          </thead>
          <tbody>
            {state.fetch.response.savegame?.history?.map((savegame) => (
              <>
                <tr>
                  <td data-label='File Name'>Visa - 3412</td>
                  <td data-label='Creation Time'>
                    {timeAgo(new Date(savegame.mtime))}
                  </td>
                  <td data-label='File Size'>{savegame.size}</td>
                </tr>
                <tr>
                  {/* rome-ignore lint/a11y/noHeaderScope: <explanation> */}
                  <td scope='row' data-label='File Name'>
                    Visa - 6076
                  </td>
                  <td data-label='Creation Time'>
                    {timeAgo(new Date(savegame.mtime))}
                  </td>
                  <td data-label='File Size'>{savegame.size}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )}
      <button type='button' className='btn' onClick={getBackupHistory}>
        Get history
      </button>
      <button type='button' className='btn' onClick={handleFtpTest}>
        Test FTP
      </button>
      <button type='button' className='btn' onClick={handleActiveSavegame}>
        Toggle save
      </button>
      <button
        type='button'
        className='btn'
        onClick={handleBackup}
        {...((!state.ftp.ip || state.fetch.isPending) && {
          disabled: true,
        })}
      >
        Backup savegame
      </button>
      <button
        type='button'
        className='btn'
        onClick={handleRestore}
        {...((!state.ftp.ip || state.fetch.isPending) && {
          disabled: true,
        })}
      >
        Restore savegame
      </button>
    </div>
  )
}
