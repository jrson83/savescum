# Preperation

If you meet the [requirements](/guide/quick-start#requirements), continue reading this guide. It will help finding the required option parameters you have to specify, using both CLI or webinterface.

## Global Options

Let's break down the `GlobalOptions` in tree suboptions we can assign to CLI commands:

- Serve Options -> `savescum serve [serve options]`
- FTP Options -> `savescum ftp [ftp options]`
- Savegame Options -> `savescum ftp [ftp options] [command] [savegame options]`

## Serve Options

All `serveOptions` are optional.

```sh
Options:
  -H, --host <string>  webinterface host (default: "127.0.0.1")
  -p, --port <number>  webinterface port (default: 3000)
  -o, --open           open webinterface in default browser (default: false)
  -l, --log            enable debug logging server events (default: true)
```

## FTP Options

All `serveOptions` are optional, but `--ip` is required.

#### `--ip`

- Go to the **Settings** option in the PS4 Dashboard.
- Then select **Network** from the list of options.
- Select the **View Connection Status** option.
- On the **View Connection Status** page you can find the **IP Address**

```sh
Options:
  -i, --ip <string>        ps4 ftp-server ip address (required)
  -p, --port <number>      ps4 ftp-server port (default: 2121)
  -u, --user <string>      ps4 ftp-server username (default: "anonymous")
  -P, --password <string>  ps4 ftp-server password (default: "")
  -n, --no-sound           disable playing notification sound
  -d, --debug              enable debug logging ftp server events (default: false)
```

## Savegame Options

All `saveGameOptions` are required, except `--backup-path`.

```sh
Options:
  -p, --profile-id <string>   (required) psn account id
  -c, --cusa <string>         (required) game title id type & number
  -s, --sdimg <string>        (required) save-game file
  -b, --backup-path <string>  local path to store backups (default: homeDir())
```

## Backup location

By default backups are stored in the home directory of the current user:

- On Windows `C:\Users\yourusername\savescum\`
- In the Mac `/users/username/savescum`
- In most Linux/Unix systems `/home/username/savescum`.

### `basePath`

- Type: `string`
- Default: `os.homedir()`

Directory to backup savegames. On Windows `C:\Users\yourusername\`. In the Mac, the home directory is `/users/username`, and in most Linux/Unix systems, it is `/home/username`.

### Directory structure

```sh
# example syntax
/home/username/savescum/
└── profileId/
    └── CUSAXXXXX/
        └── timestamp/
            └── sdimg

# example bloodborne savegame
/home/username/savescum/
└── 1ceaa172/
    └── CUSA00207/
        └── 1683605652684/
            └── sdimg_SPRJ0005
```
