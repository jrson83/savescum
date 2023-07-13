import { SavegameForm } from './form'
import { Tab, Tabs } from '@/components'
import { useApp } from '@/hooks'
import { type SavegameResponse, fetchAction } from '@/store'
import { RouteComponent } from '@/types'
import { timeAgo } from '@/utils'
import { useEffect, useMemo } from 'preact/hooks'

export const SavegamePage: RouteComponent = ({ location }) => {
  const { state, dispatch } = useApp()

  const activeGame = useMemo(() => {
    if (state.savegames.length > 0 && location.params?.id)
      return state.savegames.find(({ id }) => {
        return id === parseInt(location.params?.id as string)
      })
  }, [state.savegames, location])

  /* const handleActiveSavegame = async () => {
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
  } */

  const getBackupHistory = async () => {
    if (!state.fetch.isPending) {
      dispatch({
        type: 'fetch/pending',
        payload: {
          isPending: true,
        },
      })

      try {
        const req = await fetchAction<SavegameResponse>('history', {
          savegame: activeGame,
        })
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
        const req = await fetchAction<SavegameResponse>('test', {
          ftp: state.ftp,
        })
        dispatch({ type: 'fetch/fulfilled', payload: req })
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch({ type: 'fetch/error', payload: err.message })
        }
      }
    }
  }

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
        const req = await fetchAction<SavegameResponse>(
          'backup',
          Object.assign({}, { ftp: state.ftp }, { savegame: activeGame })
        )
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
        const req = await fetchAction<SavegameResponse>(
          'restore',
          Object.assign({}, { ftp: state.ftp }, { savegame: activeGame })
        )
        dispatch({ type: 'fetch/fulfilled', payload: req })
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch({ type: 'fetch/error', payload: err.message })
        }
      }
    }
  }

  useEffect(() => {
    if (activeGame && !state.fetch.response) getBackupHistory()
  }, [])

  return (
    <div className='main__content'>
      <h2>{activeGame?.title}</h2>
      <Tabs ariaLabel='Savegame Tabs'>
        <Tab title='Overview'>
          <button
            type='button'
            className='btn'
            onClick={getBackupHistory}
            {...(state.fetch.isPending && {
              disabled: true,
            })}
          >
            Get history
          </button>
          <button
            type='button'
            className='btn'
            onClick={handleFtpTest}
            {...((!state.ftp.ip || state.fetch.isPending) && {
              disabled: true,
            })}
          >
            Test FTP
          </button>
          {/* <button type='button' className='btn' onClick={handleActiveSavegame}>
            Toggle save
          </button> */}
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
        </Tab>
        <Tab title='Activity'>
          <div className='settings'>
            {!state.fetch.isPending && state.fetch.response && (
              <table>
                <caption style='text-align:left'>
                  <h4>Backup History</h4>
                </caption>
                <thead>
                  <tr>
                    <th scope='col'>Date</th>
                    <th scope='col'>Type</th>
                    <th scope='col'>File Size</th>
                  </tr>
                </thead>
                <tbody>
                  {state.fetch.response.savegame?.history?.map((savegame) => (
                    <tr key={savegame.id}>
                      <td data-label='Date'>{timeAgo(savegame.mtime)}</td>
                      <td data-label='Type'>Backup</td>
                      <td data-label='File Size'>{savegame.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Tab>
        <Tab title='Settings'>
          <SavegameForm />
        </Tab>
      </Tabs>
    </div>
  )
}
