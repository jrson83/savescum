# Why savescum?

## Overview

PlayStation 4 [save scumming](https://www.makeuseof.com/what-is-save-scumming-video-games/) with USB storage device or online storage can be very time-consuming. After countless attempts with bad RNG, the long wait to restore the savegame can lead to frustration.

However, on a jailbroken PlayStation 4 there are ways to speed up save scumming:

- Applying a `no-logo` patch to a game, if available
- Using [Apollo Save Tool](https://github.com/bucanero/apollo-ps4) to suspend a games process & copy savegames faster

As an alternative approach, this tool provides a CLI/webinterface to perform FTP operations through the [GoldHEN](https://github.com/GoldHEN/GoldHEN) FTP-Server. 

It tries to keep the effort to `backup` and `restore` savegames as low as possible, speed up the process as fast as possible, and provides multiple input configuration for `hotkeys`.

## Motivation

Personally, I don't do cheating or save-editing in games, and I'm glad I'm forced to play Bloodborne offline because of the [60 FPS patch](https://www.bloodborne-wiki.com/2020/05/bloodborne-60-fps-mod.html). I don't mind [save edited dungeons](https://www.bloodborne-wiki.com/2017/11/save-editing-chalice-dungeons.html), but I don't use them myself. I have nothing against [save scumming](https://www.makeuseof.com/what-is-save-scumming-video-games/), though.

So I started working on this project, when I was using WinSCP FTP client to speed up save scumming when playing my favourite game, [Bloodborne](https://www.bloodborne-wiki.com/).

Since manually triggering the ftp upload/download with WinSCP always required active interaction, either with the mouse or the keyboard, I was wondering how I could automate this process.

## Evolution

First, I developed a small `javascript` snippet to start the savegame transfer with [Node.js](https://nodejs.org/en). Since the savegame always has the same file path, I specified it static.

```js
// src/index.js
import ftp from 'basic-ftp'
import { exec } from 'child_process'

async function restoreSaveGame() {
  const client = new ftp.Client()
  client.ftp.verbose = true

  try {
    await client.access({
      host: '192.168.178.69',
      port: 2121,
      user: 'anonymous',
      secure: false,
    })

    await client.ensureDir('/user/home/1ceaa172/savedata/CUSA00207')
    await client.uploadFrom(
      '/some/local/dir/sdimg_SPRJ0005',
      '/user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005'
    )
  } catch (err) {
    console.log(err)
  }
  client.close()
}

await restoreSaveGame().then(() => {
  // Play notification sound
  exec(`rundll32 user32.dll,MessageBeep`)
  setTimeout(() => {
    process.exit()
  }, 1000)
})
```

To repetitive execute the command with the gamepad connected to my computer, I used the tool [antimicrox](https://github.com/AntiMicroX/antimicrox) to map my gamepad keys to keyboard macros: `UP` & `RETURN`

```sh
node src/index.js
```

Since I wanted to make this effective savescum method available to others, I started working on savescum.

## Architecture​

The `savescum` core module is a small executable (CLI) built with [TypeScript](https://www.typescriptlang.org/) and [Node.js](https://nodejs.org/en), bundled with [ptsup](https://github.com/hairyf/ptsup). It has only a few dependencies and is lightweight `324.42 KiB` minified & gzipped.

Savescum's webinterface module `@savescum/web` is built with [Preact](https://preactjs.com/) and [TypeScript](https://www.typescriptlang.org/), bundled with [vite](https://vitejs.dev/) and used by the `savescum` core module as a `dependency`.

A `@fastify` server included in the core module can be invoked by running the CLI's `serve` command. It does two things:

- Serves the webinterface on `localhost` (default: http://127.0.0.1:3000)
- Provides API routes for `basic-ftp` backup & restore operations

### TypeScript Interfaces

```ts
// serve command options
interface ServerOptions {
  host?: string
  port?: number
  open?: boolean
  log?: boolean
}

// backup & restore command options
interface FTPOptions {
  ip: string
  port?: number
  username?: string
  password?: string
  secure?: boolean
}

interface SaveGame {
  profileId: string
  cusa: string
  sdimg: string
  password: string
  backupPath: string
}


type Options = {
  ftp: FTPOptions
  savegames: SaveGame[]
}
```
