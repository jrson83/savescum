# Webinterface

::: warning INFO
The webinterface is currently in development.
:::

## Overview

Savescum's webinterface simplifies and speeds up save scumming. It lets you store your savegame configs in the browsers `localStorage` and choose/configure either gamepad, mouse or keyboard, to trigger FTP `backup` and `restore` operations.

It can be accessed from any device within the local network, giving the advantage to execute FTP operations with a smartphones webbrowser.

## Installation

This guide assumes you've already read the [Quick Start](/guide/quick-start) & [Preperation](/guide/preperation) guides and installed savescum as `npm` module or use it with `npx`.

## Usage

::: tip
Savescum CLI is required to serve the webinterface.

```sh
savescum serve

# outputs
ℹ Running serve ...
✔ Server listening at http://127.0.0.1:3000
```

The webinterface is now running on your local system at http://127.0.0.1:3000.
:::
