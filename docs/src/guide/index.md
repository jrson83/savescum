# Introduction

## Description

>  A command-line tool & webinterface, to efficiently save scum on an exploitable PS4/PS5.

<a href="https://pkg-size.dev/savescum"><img src="https://pkg-size.dev/badge/bundle/1528" title="Bundle size for savescum"></a>

## 🎯 Features

- ⚡ Blazing fast savegame backup & restore
- 🛠️ Runs as web application or stand-alone CLI
- 🎮 Controller & Keyboard support (__hotkeys__)
- 🔉 Sound notification on completed operation
- 📦 Suits any game with a single savefile

## Command Line Interface

Savescum lets you back up and restore savegames using PS4/PS5 FTP server.

### Example usage (Bloodborne savegame)

```sh
savescum ftp --ip=192.168.178.69 \
backup --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005 --debug

# outputs
ℹ Running backup ...
  ├── Remote Path: /user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005
  └── Local Path: C:\Users\jrson\savescum\1ceaa172\CUSA00207\2023-06-01_00-04-44\sdimg_SPRJ0005

✔ Backup operation completed successfully.
```

::: danger BREAKING CHANGE
Since commit [737860e](https://github.com/jrson83/savescum/commit/188a70be23891cf118828128f067fcbbc4261d55) in savescum@0.3.0 the date format in local savegame backup path changed to `YYYY-MM-DD_HH-mm-ss GMT+0000`. This makes it easier to manage & distinguish savegame backups.

**All existing folders in %USERPROFILE%/savescum must be deleted.**
:::

## Webinterface

::: warning INFO
The webinterface is currently in development.
:::

Savescum's webinterface simplifies and speeds up save scumming. It lets you store your savegame configs in the browsers `localStorage` and choose/configure either gamepad, mouse or keyboard, to trigger FTP `backup` and `restore` operations.

It can be accessed from any device within the local network, giving the advantage to execute FTP operations with a smartphones webbrowser.

::: tip
Savescum CLI is required to serve the webinterface.

```sh
savescum serve

# outputs
ℹ Running serve ...
✔ Server listening at http://127.0.0.1:3000
```
:::

### Example screenshots

> The screenshots are currently work in progress.

## What's next?

- Read more about [why savescum?](/guide/why-savescum)
- Read the [Quick Start](/guide/quick-start) guide to get started

---

::: info
<ins>Your contributions are welcome!</ins> Please read the [contributing guide](https://github.com/jrson83/savescum/blob/main/CONTRIBUTING.md) for more information.
:::

## License

Licensed under the [MIT license](https://github.com/jrson83/ps4-savescum/blob/main/LICENSE).
