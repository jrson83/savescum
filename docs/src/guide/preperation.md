# Preperation

## Overview
If you meet the [requirements](/guide/quick-start#requirements), continue reading this guide. It will help finding the required option parameters you have to specify, using both CLI or webinterface.

## How to obtain PS4/PS5 IP address?

1. Go to the **Settings** option in the PS4/PS5 Dashboard
2. Then select **Network** from the list of options
3. Select the **View Connection Status** option
4. On the **View Connection Status** page you can find the **IP Address**
5. **Use** savescum [CLI](http://127.0.0.1:5173/cli/commands#savescum-ftp-test) or webinterface to `test` the PS4/PS5 FTP server connection

## How to start GoldHEN FTP server?

1. Go to the **Settings** option in the PS4 Dashboard
2. Then select :star:**GoldHEN**:star:  from the list of options
3. Select the **Server Settings** option
4. Then **Enable FTP Server**

## How to activate offline PSN account?

1. **Run** Apollo Save Tool
2. **Select** User Tools > Activate PS4 Accounts

> You should see a list with all your accounts. An account is not activated when it has no auto-generated account ID, meaning `(0000000000000000)` following the username.

3. **Select** the account > Auto-generated Account ID
4. **Exit** Apollo Save Tool
5. **Restart** the PS4 console
6. **Resign** your savegame files
7. **Note down** the Auto-generated Account ID

## How to obtain PSNID, CUSA & SDIMG?

### Obtain automatically

You can use the cli's [profiles command](/cli/commands#savescum-ftp-profiles), to receive a list of all profiles from ftp including:

- psn-id (offline activated account)
- username
- avatar (as base64/png)
- savedata (a list of savegames)

### Obtain manually (deprecated)

> If you don't know a games CUSA, you can search for it on [orbispatches.com](https://orbispatches.com) or [prosperopatches.com](https://prosperopatches.com/).

1. **Download** [WinSCP](https://winscp.net/eng/download.php), [FileZilla](https://filezilla-project.org/) or any FTP-Client
2. **Connect** to the PS4/PS5 FTP server

```sh
Protocol: FTP
IP: PS4/PS5 IP address you obtained before
Port: 2121 or 1337
User: anonymous
Password: empty
```

3. **Locate** your savegame file

```sh
/user/home/XXXXXXXX/CUSAXXXXX/SDIMG_XXX
              │         │        │
              │         │        └─⫸ SDIMG (Savegame file)
              │         │
              │         └─⫸ CUSA (Game Title & ID Number)
              │
              └─⫸ PSN Account ID
```

4. **Note down** CUSA & SDIMG
5. **Use** savescum [CLI](http://127.0.0.1:5173/cli/commands#savescum-ftp-test) or webinterface to `test` the PS4/PS5 FTP server connection
