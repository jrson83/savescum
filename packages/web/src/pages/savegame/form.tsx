import { useApp, useForm, useMatch, useRouter } from '@/hooks'
import { type Savegame, type SavegameResponse, fetchAction } from '@/store'

const SavegameForm: FunctionComponent = () => {
  const {
    state: { savegames, fetch, ftp },
    dispatch,
  } = useApp()
  const { pathname } = useRouter()
  const match = useMatch('/savegame/:id', pathname)

  const activeSave = savegames.find(
    ({ id }) => id === parseInt(match?.params?.id as string)
  )

  /* useEffect(() => {
    activeSave = savegames.find(
      ({ idx }) => idx === parseInt(match?.params?.id as string)
    )
    console.log(activeSave)
  }, [savegames]) */

  const {
    handleSubmit,
    handleChange,
    data: savegame,
    errors,
  } = useForm<Savegame>({
    validations: {
      title: {
        pattern: {
          value: '^(.*?)*$',
          message: 'Please provide a valid game title.',
        },
      },
      profileId: {
        pattern: {
          value: '^[a-zA-Z0-9]*$',
          message: 'Please provide a valid PSN-ID.',
        },
      },
      cusa: {
        pattern: {
          value: '^[a-zA-Z0-9]*$',
          message: 'Please provide a valid cusa.',
        },
      },
      sdimg: {
        pattern: {
          value: '^[a-zA-Z0-9_-]*$',
          message: 'Please provide a valid sdimg.',
        },
      },
    },
    onSubmit: (e: Event) => {
      e.preventDefault()
      dispatch({
        type: 'savegame/edit',
        payload: {
          id: savegame.id,
          title: savegame.title,
          profileId: savegame.profileId,
          cusa: savegame.cusa,
          sdimg: savegame.sdimg,
          createdAt: savegame.createdAt,
        },
      })
    },
    initialValues: {
      ...activeSave,
    },
  })

  const handleFtpEnsure = async (e: Event) => {
    e.preventDefault()
    if (!fetch.isPending) {
      dispatch({
        type: 'fetch/pending',
        payload: {
          isPending: true,
        },
      })

      try {
        const req = await fetchAction<SavegameResponse>('ensure', {
          ftp,
          savegames,
        })
        dispatch({ type: 'fetch/fulfilled', payload: req })
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch({ type: 'fetch/error', payload: err.message })
        }
      }
    }
  }

  return (
    <>
      <div className='settings'>
        <form onSubmit={handleSubmit}>
          <div className='two-columns'>
            <div className='form-panel__item'>
              <div className='form-panel__title'>Manage this savegame</div>
              <div className='form-panel__desc'>
                <small>Edit the current savegame</small>
              </div>
            </div>
            <div className='form__content'>
              <div className='form-group' data-before='Game Title'>
                <input
                  id='input-title'
                  type='text'
                  placeholder='Bloodborne (Level 544)'
                  value={savegame.title}
                  onInput={handleChange('title')}
                  className='ifta-field'
                  required
                />
                <label
                  for='input-title'
                  className={`label-after smaller ${errors.title && 'c-error'}`}
                >
                  {errors.title
                    ? errors.title
                    : 'Configure the title of the game'}
                </label>
              </div>
              <div className='form-group' data-before='PSN Account ID'>
                <input
                  id='input-profile-id'
                  placeholder='1ceaa172'
                  type='text'
                  value={savegame.profileId}
                  onChange={handleChange('profileId')}
                  className='ifta-field'
                  required
                />
                <label
                  for='input-profile-id'
                  className={`label-after smaller ${
                    errors.profileId && 'c-error'
                  }`}
                >
                  {errors.profileId
                    ? errors.profileId
                    : 'Configure the psn account id'}
                </label>
              </div>
              <div className='form-group' data-before='CUSA'>
                <input
                  id='input-cusa'
                  placeholder='CUSA00207'
                  type='text'
                  value={savegame.cusa}
                  onChange={handleChange('cusa')}
                  className='ifta-field'
                  required
                />
                <label
                  for='input-cusa'
                  className={`label-after smaller ${errors.cusa && 'c-error'}`}
                >
                  {errors.cusa
                    ? errors.cusa
                    : 'Configure the cusa (Title ID & Number) of the game'}
                </label>
              </div>
              <div className='form-group' data-before='SDIMG'>
                <input
                  id='input-sdimg'
                  placeholder='sdimg_SPRJ0005'
                  type='text'
                  value={savegame.sdimg}
                  onChange={handleChange('sdimg')}
                  className='ifta-field'
                  required
                />
                <label
                  for='input-sdimg'
                  className={`label-after smaller ${errors.sdimg && 'c-error'}`}
                >
                  {errors.sdimg
                    ? errors.sdimg
                    : 'Configure the sdimg (Savegame file) of the game'}
                </label>
              </div>
            </div>
          </div>
          <div className='btn-container-right'>
            <button
              type='button'
              className='btn btn-outline'
              onClick={handleFtpEnsure}
              {...((!ftp.ip || fetch.isPending) && {
                disabled: true,
              })}
            >
              Run Test
            </button>
            <button type='submit' className='btn'>
              Save
            </button>
          </div>
        </form>
      </div>

      <div className='settings'>
        <div className='form-panel'>
          <div className='form-panel__item'>
            <div className='form-panel__title'>Delete this savegame</div>
            <div className='form-panel__desc'>
              <small>Once you delete a savegame, there is no going back.</small>
            </div>
          </div>
          <div className='form-panel__element'>
            <button type='button' className='btn btn-outline-error'>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export { SavegameForm }
