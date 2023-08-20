# CLI Usage Example

## Webinterface server

### `savescum serve`

Start savescum webinterface. (`default command`)

#### Example usage

```sh
savescum serve

# outputs
ℹ Running serve ...
✔ Server listening at http://127.0.0.1:3000
```

The webinterface is now running on your local system at [http://127.0.0.1:3000](http://127.0.0.1:3000).

## FTP server

### `savescum ftp`

Perform operations with the PS4/PS5 FTP server. (`no standalone command`)

`savescum ftp test`

Test connection to PS4/PS5 FTP server.

#### Example usage

```sh
savescum ftp --ip=192.168.178.69 test

# outputs
ℹ Running connection test ...
✔ Connection succeeded

# or
savescum ftp --ip=192.168.179.69 --port=21 --no-sound --debug test

# outputs
ℹ Running connection test ...
  - Connecting to ftp://anonymous@192.168.178.69:21

✔ Connection succeeded
```

`savescum ftp backup`

Create local savegame backup from PS4/PS5 FTP server.

#### Example usage (Bloodborne savegame)

```sh
savescum ftp --ip=192.168.178.69 \
backup --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005 --debug

# outputs
ℹ Running backup ...
  ├── Remote Path: /user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005
  └── Local Path: C:\Users\jrson\savescum\1ceaa172\CUSA00207\1683605652684\sdimg_SPRJ0005

✔ Backup completed
```

`savescum ftp restore`

Restore local savegame backup to PS4/PS5 FTP server.

#### Example usage (Bloodborne savegame)

```sh
savescum ftp --ip=192.168.178.69 \
restore --profile-id=1ceaa172 --cusa=CUSA00207 --sdimg=sdimg_SPRJ0005 --debug

# outputs
ℹ Running restore ...
  ├── Local Path: C:\Users\jrson\savescum\1ceaa172\CUSA00207\1683605652684\sdimg_SPRJ0005
  └── Remote Path: /user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005

✔ Restore completed
```
