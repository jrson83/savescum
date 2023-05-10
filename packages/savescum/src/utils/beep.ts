import { exec } from 'node:child_process'

export function beep() {
  return new Promise((resolve, _reject) => {
    if (process.platform === 'win32') {
      exec(`rundll32 user32.dll,MessageBeep`, (error, stdout, stderr) => {
        if (error) {
          console.warn(error)
        }
        resolve(stdout ? stdout : stderr)
      })
    }
    process.stderr.write('\x07', (err) => {
      resolve(err)
    })
  })
}
