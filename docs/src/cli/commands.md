# Command Reference

<!-- ## Webinterface server -->

## `savescum serve`

Start savescum webinterface. (`default command`)

### Usage

```sh
savescum [options]

# or
savescum serve [options]
```

::: tip
To listen on all addresses, including LAN and public addresses, set the webinterface `--host` to `0.0.0.0`. This is required to access the webinterface from a different device.
:::

### Options

| Option | Description |
| -      | -           |
| `--host <string>`        | Specify webinterface host (default: `127.0.0.1`) (`string`) |
| `--port <port>`          | Specify webinterface port (default: `3000`) (`number`) |
| `--open`                 | Open browser on startup (default: `false`) (`boolean`) |
| `--log`                  | Enable debug logging (default: `false`) (`boolean`) |
| `--help`                 | Display help for command |

::: details Click to view usage example
```sh
savescum serve

# outputs
ℹ Running serve ...
✔ Server listening at http://127.0.0.1:3000
```

The webinterface is now running on your local system at [http://127.0.0.1:3000](http://127.0.0.1:3000).
:::

<!-- ## FTP server -->

## `savescum ftp`

Perform operations with the PS4/PS5 FTP server.

### Usage

```sh
savescum ftp [options] [command]
```

### Options

| Option | Description |
| -      | -           |
| `--ip <string>`          | Specify PS4/PS5 FTP server ip (`string`) (`required`) |
| `--port <port>`          | Specify PS4/PS5 FTP server port (default: `2121`) (`number`) |
| `--user <string>`        | Specify PS4/PS5 FTP server user (default: `anonymous`) (`string`) |
| `--password <string>`    | Specify PS4/PS5 FTP server password (default: `''`) (`string`) |
| `--no-sound`             | Disable playing notification sound (`boolean`) |
| `--debug`                | Enable debug logging ftp server events (default: `false`) (`boolean`) |
| `--help`                 | Display help for command |

### Commands

## `savescum ftp test`

Test connection to PS4/PS5 FTP server.

### Usage

```sh
savescum ftp [options] test [options]
```

::: details Click to view usage example
```sh
savescum ftp --ip=192.168.178.69 test

# outputs
ℹ Running connection test ...
✔ Connection established successfully.

# or
savescum ftp --ip=192.168.179.69 --port=21 --no-sound --debug test

# outputs silent
ℹ Running connection test ...
  - Connecting to ftp://anonymous@192.168.178.69:21

✔ Connection established successfully.
```
:::

---

## `savescum ftp profiles`

Lists PSN profiles/accounts with avatars (base64) from PS4/PS5 FTP server.

### Usage

```sh
savescum ftp [options] profiles [options]
```

::: tip
The command will list all profiles from ftp including:

- psn-id (offline activated account)
- username
- avatar (as base64/png)
- savedata (a list of savegames)
:::

::: details Click to view usage example
```sh
savescum ftp --ip=192.168.178.69 profiles

# outputs
ℹ Getting profiles ...
✔ Profiles operation completed successfully.

ℹ Found 2 profiles:
  ➜ ID: 1bexx117
    Username: chiaki
    Avatar: iVBORw0KGgoAAAANSUhE...
    Savedata: [{"cusa":"CUSA00207","sdimg":[{"name":"sdimg_SPRJ0005","size":37224448}]}]

  ➜ ID: 1ceaa172
    Username: AHunterMustHunt
    Avatar: iVBORw0KGgoAAAANSUhE...
    Savedata: [{"cusa":"CUSA00207","sdimg":[{"name":"sdimg_SPRJ0005","size":37224448}]}]
```
:::

---

## `savescum ftp backup`

Create local savegame backup from PS4/PS5 FTP server.

### Usage

```sh
savescum ftp [options] backup [options]
```

::: details Click to view usage example
```sh
# example Bloodborne savegame
savescum ftp --ip=192.168.178.69 \
backup --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005 --debug

# outputs
ℹ Running backup ...
  ├── Remote Path: /user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005
  └── Local Path: C:\Users\jrson\savescum\1ceaa172\CUSA00207\1683605652684\sdimg_SPRJ0005

✔ Backup operation completed successfully.
```
:::

---

## `savescum ftp restore`

Restore local savegame backup to PS4/PS5 FTP server.

### Usage

```sh
savescum ftp [options] restore [options]
```

::: details Click to view usage example
```sh
savescum ftp --ip=192.168.178.69 \
restore --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005 --debug

# outputs
ℹ Running restore ...
  ├── Local Path: C:\Users\jrson\savescum\1ceaa172\CUSA00207\1683605652684\sdimg_SPRJ0005
  └── Remote Path: /user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005

✔ Restore operation completed successfully.
```
:::

### Options

| Option | Description |
| -      | -           |
| `--profileId <string>`   | Specify PSN account id (`string`) (`required`) |
| `--cusa <string>`        | Specify game title id type & number (`string`) (`required`) |
| `--sdimg <string>`       | Specify savegame file name (`string`) (`required`) |
| `--backup-path <string>` | Local path to backup savegames (default: `os.homedir()`) (`string`) |
| `--help`                 | Display help for command |
