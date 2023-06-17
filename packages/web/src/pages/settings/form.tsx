import { Icon } from '@/components'
import { useApp, useForm } from '@/hooks'
import { DefaultResponse, type FtpOptions, fetchAction } from '@/store'

const FTPForm: FunctionComponent = () => {
  const { state, dispatch } = useApp()

  const isSucesfullResponse = () => {
    return (
      state.ftp.ip !== '' &&
      !state.fetch.error &&
      !state.fetch.isPending &&
      // rome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
      state.fetch.response?.hasOwnProperty('success')
    )
  }

  const {
    handleSubmit,
    handleChange,
    data: options,
    errors,
  } = useForm<FtpOptions>({
    validations: {
      ip: {
        pattern: {
          value:
            '^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
          message: 'Please provide a valid IP address.',
        },
      },
      port: {
        custom: {
          isValid: (value) => typeof parseInt(value, 10) === 'number',
          /* value: '^[0-9]*$', */
          message: 'Please provide a valid port number.',
        },
      },
      user: {
        pattern: {
          value: '^[a-zA-Z0-9_.-]*$',
          message: 'Please provide a valid username.',
        },
      },
    },
    initialValues: state.ftp,
    onSubmit: (e: Event) => {
      e.preventDefault()
      dispatch({
        type: 'ftp/save',
        payload: {
          requestType: options.requestType,
          ip: options.ip,
          port: options.port,
          user: options.user,
          password: options.password,
          secure: false,
        },
      })
    },
  })

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

  return (
    <div className='settings'>
      <form onSubmit={handleSubmit}>
        <div className='two-columns'>
          <div className='form__title'>
            <div style='display:flex;flex-direction:column;row-gap:0.25rem;'>
              <span style='color:var(--c-font-prim);font-weight:500;'>
                GoldHEN FTP-Server
              </span>
              <small>Define credentials for the GoldHEN FTP-Server</small>
              <div style='margin-top:2rem;'>
                {state.ftp.ip === '' ? (
                  <div className='icon'>
                    <Icon
                      icon={'statusQuestion'}
                      title='FTPstatus'
                      color='c-warn'
                      size={24}
                    />{' '}
                    &nbsp;
                    <small>No FTP-Server IP currently configured.</small>
                  </div>
                ) : state.fetch.isPending ? (
                  <div className='icon'>
                    <Icon
                      icon={'statusInfo'}
                      title='FTPstatus'
                      color='c-info'
                      size={24}
                    />{' '}
                    &nbsp;
                    <small>Fetching...</small>
                  </div>
                ) : isSucesfullResponse() ? (
                  <div className='icon'>
                    <Icon
                      icon={'statusSuccess'}
                      title='FTPstatus'
                      color='c-success'
                      size={24}
                    />{' '}
                    &nbsp;
                    <small>Test Connection Successful!</small>
                  </div>
                ) : (
                  <div className='icon'>
                    <Icon
                      icon={'statusError'}
                      title='FTPstatus'
                      color='c-error'
                      size={24}
                    />{' '}
                    &nbsp;
                    <small>
                      Could not establish connection to PS4
                      {state.ftp.ip === ''
                        ? ': No IP specified.'
                        : state.fetch.error !== undefined
                        ? `: ${state.fetch.error}`
                        : '.'}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='form__content'>
            <div className='form-group' data-before='IP Address'>
              <input
                id='input-ip'
                type='text'
                placeholder='192.168.178.69'
                value={options.ip || ''}
                pattern='^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
                onInput={handleChange('ip')}
                className='ifta-field'
                required
              />
              <label for='input-ip' className='label-after smaller'>
                Configure the ip address of the FTP-Server
              </label>
              {errors.ip && <p className='error'>{errors.ip}</p>}
            </div>
            <div className='form-group' data-before='Port'>
              <input
                id='input-port'
                placeholder='2121'
                type='number'
                value={options.port || 2121}
                min='1'
                onChange={handleChange<number>('port', (value) =>
                  parseInt(value, 10)
                )}
                className='ifta-field'
                required
              />
              <label for='input-port' className='label-after smaller dimm'>
                Configure the port (<code>default: 2121</code>)
              </label>
              {errors.port && <p className='error'>{errors.port}</p>}
            </div>
            <div className='form-group' data-before='Username'>
              <input
                id='input-user'
                placeholder='User'
                type='text'
                value={options.user || 'anonymous'}
                onChange={handleChange('user')}
                className='ifta-field'
                required
              />
              <label for='input-user' className='label-after smaller'>
                Configure the username (<code>default: anonymous</code>)
              </label>
              {errors.user && <p className='error'>{errors.user}</p>}
            </div>
            <div className='form-group' data-before='Password'>
              <input
                id='input-password'
                placeholder='********'
                type='password'
                value={options.password || ''}
                onChange={handleChange('password')}
                className='ifta-field'
              />
              <label for='input-password' className='label-after smaller'>
                Configure the password (<code>default: empty</code>)
              </label>
              {errors.password && <p className='error'>{errors.password}</p>}
            </div>
          </div>
        </div>
        <div className='btn-container-right'>
          <button type='reset' className='btn'>
            Reset
          </button>
          <button
            type='button'
            className='btn'
            onClick={handleFtpTest}
            {...((!state.ftp.ip || state.fetch.isPending) && {
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
  )
}

export { FTPForm }
