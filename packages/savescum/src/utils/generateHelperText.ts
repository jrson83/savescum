import {
  HELPER_CUSA,
  HELPER_IP,
  HELPER_PORT,
  HELPER_PROFILE,
  HELPER_SDIMG,
} from '../constants'

export const generateHelperText = (cmd: string) => {
  if (cmd === 'test' || cmd === 'profiles') {
    return `
  Example:
    $ savescum ftp --ip=${HELPER_IP} ${cmd}
    $ savescum ftp --ip=${HELPER_IP} --port=${HELPER_PORT} --no-sound --debug ${cmd}`
  } else {
    return `
  Example (Bloodborne savegame):
    $ savescum ftp --ip=${HELPER_IP} ${cmd} --profile-id=${HELPER_PROFILE} --cusa=${HELPER_CUSA} --sdimg=${HELPER_SDIMG}
    $ savescum ftp --ip=${HELPER_IP} --port=${HELPER_PORT} --no-sound ${cmd} --profile-id=${HELPER_PROFILE} --cusa=${HELPER_CUSA} --sdimg=${HELPER_SDIMG}`
  }
}
