# Quick Start

## Requirements

Savescum has a few requirements:

- [Node.js](https://nodejs.org/en/) `>= 16.15.1`
- PlayStation 4 (`Jailbroken`)
  - [GoldHEN](https://github.com/GoldHEN/GoldHEN) or any FTP-Server
  - [Apollo Save Tool](https://github.com/bucanero/apollo-ps4)
  - Activated offline PSN account 

## Installation

Savescum can be installed globally as a Node.js command line tool:

```sh
npm install -g savescum
```

## Usage

Once installed, the `savescum` command becomes available and can be run from any directory. Alternatively, you can use savescum with `npx` directly:

```sh
# with global installation
savescum [options] [command]

# or run with npx
npx savescum [options] [command]
```

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
