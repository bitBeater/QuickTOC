# Obsidian Plugin Template

## Introduction

This project is a template for creating plugins for Obsidian, a popular
note-taking and knowledge management application. It includes scripts for
building, deploying, and managing the plugin lifecycle.

[Obsidian plugin development guide](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)

## Table of Contents

- [Installation](#installation)
- [Dependencies](#dependencies)
  - [Deno](#deno)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
  - [Setting the Obsidian Plugin Directory (for local deploy)](#setting-the-obsidian-plugin-directory)
  - [Setting the package.json File](#setting-the-packagejson-file)
- [Building the Plugin](#building-the-plugin)
- [Deploying the Plugin](#deploying-the-plugin)
- [Manifest generation](#manifest-generation)
  - [Customize Manifest generation](#customize-manifest-generation)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Installation

To use this template, clone the repository to your local machine:

```bash
gh repo create [REPO_NAME] --template=bitBeater/obsidian_plugin_template
```

## Dependencies

### Deno

To run the scripts, you need to have **Deno** installed on your machine. You can
install Deno using the following command:

```bash
curl -fsSL https://deno.land/install.sh | sh
```

[or chose another installation method](https://docs.deno.com/runtime/manual/getting_started/installation)

## Usage

This template is designed to streamline the development of Obsidian plugins. Use
the provided scripts to build and deploy your plugin.

## Features

- **Build Script**: Bundles the plugin, generates the manifest file, and outputs
  the JavaScript bundle and assets to the `dist` directory.
- **Deploy Script**: Builds the plugin and copies the content of the `dist`
  directory to the specified Obsidian plugins directory.
- **Manifest Creation Script**: Automatically generates the `manifest.json` file
  required for Obsidian plugins from the `package.json` file.

## Configuration

### Setting the Obsidian Plugin Directory

Configure the deployment directory in the `.env` file:

```sh
VAULT_DIR="<path to your vault>";
```

### Setting the package.json File

You have to confugure the `package.json`.<br/>Default configuration is as
follows:

```jsonc
{
  "name": null,
  "version": null,
  "description": null,
  "license": null,
  "author": {
    "name": null,
    "email": null,
    "url": null
  },
  "manifest": {
    "minAppVersion": null,
    "isDesktopOnly": null
  }
  //...
}
```

## Building the Plugin

To build the plugin, run:

```bash
npm run build
```

## Deploying the Plugin

Before deploying, ensure the `VAULT_DIR` in `.env` is set to your Obsidian
vault.<br/>To deploy the plugin, run:

```bash
npm run deploy
```

## Manifest generation

The manifest file is crucial for Obsidian to recognize and use the plugin. It is
generated from the `package.json` file.<br/>Here is the mapping between:

```json
{
  "id": "packageJson.author + packageJson.name",
  "minAppVersion": "packageJson.manifest.minAppVersion",
  "isDesktopOnly": "packageJson.manifest.isDesktopOnly",
  "name": "packageJson.name",
  "version": "packageJson.version",
  "description": "packageJson.description",
  "author": "packageJson.author.name",
  "authorUrl": "packageJson.author?.url",
  "fundingUrl": "packageJson.funding.url"
}
```

example:

```jsonc
// package.json
{
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "Obsidian plugin description",
  "author": {
    "name": "John Doe",
    "url": "https://johndoe.com"
  },
  "funding": {
    "url": "https://jonhdoe.com/give-me-money"
  },
  "manifest": {
    "minAppVersion": "0.12.0",
    "isDesktopOnly": true
  }
}



// manifest.json
{
  "id": "John_Doe@My_Plugin",
  "name": "My Plugin",
  "version": "0.0.12",
  "description": "Obsidian plugin description",
  "author": "John Doe",
  "authorUrl": "https://johndoe.com",
  "fundingUrl": "https://jonhdoe.com/give-me-money",
  "minAppVersion": "0.12.0",
  "isDesktopOnly": true
}
```

---

### Customize Manifest generation

if a manifest field is set in the `package.json`'s `manifest` section, it will
overwrite the generated value.<br/> For example if you want to set a custom
`manifest` `id` field:

```jsonc
// package.json
{
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "Obsidian plugin description",
  "author": {
    "name": "John Doe",
    "url": "https://johndoe.com"
  },
  "funding": {
    "url": "https://jonhdoe.com/give-me-money"
  },
  "manifest": {
    "id": "pluginId",
    "minAppVersion": "0.12.0",
    "isDesktopOnly": true
  }
}



// manifest.json
{
  "id": "pluginId",
  "name": "My Plugin",
  "version": "0.0.12",
  "description": "Obsidian plugin description",
  "author": "John Doe",
  "authorUrl": "https://johndoe.com",
  "fundingUrl": "https://jonhdoe.com/give-me-money",
  "minAppVersion": "0.12.0",
  "isDesktopOnly": true
}
```
