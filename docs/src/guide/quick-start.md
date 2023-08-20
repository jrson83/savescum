# Quick Start

## Requirements

Savescum has a few requirements:

- [Node.js](https://nodejs.org/en/) `>= 16.15.1`
- An exploitable PlayStation 4/5 (see [PS4 JB Status](https://wololo.net/2023/05/02/ps4-jailbreak-the-status-in-2023/), [PS5 JB Status](https://wololo.net/2023/05/04/ps5-jailbreak-the-status-in-2023/))
  - PS4: [GoldHEN](https://github.com/GoldHEN/GoldHEN) or any FTP-Server
  - PS5: FTPS5 either [SiSTR0](https://github.com/SiSTR0/FTPS5) or [EchoStretch](https://github.com/EchoStretch/FTPS5)

### Recommended for PS4

  - [Apollo Save Tool](https://github.com/bucanero/apollo-ps4)
  - Activated PSN offline account 

## Installation

Savescum can be installed globally as a Node.js command line tool:

```sh
npm install -g savescum
```

## Usage

After installing, the `savescum` command becomes available and can be run from any directory. Alternatively, you can use savescum with `npx` directly:

```sh
# with global installation
savescum [options] [command]

# or run with npx
npx savescum [options] [command]
```

::: tip
To listen on all addresses, including LAN and public addresses, set the webinterface `--host` to `0.0.0.0`. This is required to access the webinterface from a different device.
:::

## Backup location

By default backups are stored in the home directory of the current user:

- On Windows `C:\Users\yourusername\savescum\`
- In the Mac `/users/username/savescum`
- In most Linux/Unix systems `/home/username/savescum`

### Directory structure

Savegame files are not overwritten. Each backup is stored in a `creationTimestamp` folder.

```sh
# example syntax
/home/username/savescum/
└── profileId/
    └── CUSAXXXXX/
        └── timestamp/ # creationTimestamp
            └── sdimg

# example bloodborne savegame
/home/username/savescum/
└── 1ceaa172/
    └── CUSA00207/
        └── 1683605652684/
            └── sdimg_SPRJ0005
```
