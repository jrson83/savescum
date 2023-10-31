# Command Line Interface

## Overview

Savescum lets you back up and restore savegames through the PS4/PS5 FTP server.

## Installation

This guide assumes you've already read the [Quick Start](/guide/quick-start) & [Preperation](/guide/preperation) guides and installed savescum as `npm` module or use it with `npx`.

## Usage

To get a list of available commands, arguments, and flags, run:

```sh
savescum --help

# outputs
Usage: savescum [options] [command]

A command-line tool & webinterface, to efficiently save scum on an exploitable PS4/PS5.

Options:
  -V, --version    output the version number
  -h, --help       display help for command

Commands:
  serve [options]  serve webinterface (default: http://127.0.0.1:3000)
  ftp [options]    perform ftp operations through cli
  help [command]   display help for command
```

To get a list of available sub-commands, arguments, and flags, run:

```sh
savescum [command] --help

# example
savescum ftp test --help

# outputs
Usage: savescum ftp test [options]

test connection to ftp-server

Options:
  -h, --help               display help for command

Global Options:
  -i, --ip <string>        ftp-server ip address (required)
  -p, --port <number>      ftp-server port (default: 2121)
  -u, --user <string>      ftp-server username (default: "anonymous")
  -P, --password <string>  ftp-server password (default: "")
  -s, --secure             explicit ftps over tls (default: false)
  -n, --no-sound           disable playing notification sound
  -d, --debug              enable debug logging ftp server events (default: false)
  -V, --version            output the version number

  Example:
    $ savescum ftp --ip=192.168.178.39 test
    $ savescum ftp --ip=192.168.178.39 --port=21 --no-sound --debug test
```
