# Memberhive

<img src="http://memberhive.com/images/mh-logo.png" alt="Logo Memberhive" width="300px" />

[![travis](https://travis-ci.org/digitaldeacon/memberhive.svg?branch=master)](https://travis-ci.org/digitaldeacon/memberhive)
[![Dependency Status][david-badge]][david-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]
[![Join the chat at https://gitter.im/memberhive2/Lobby](https://badges.gitter.im/memberhive2/Lobby.svg)](https://gitter.im/memberhive2/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Note

Memberhive is now in Beta status. Many dependencies, like material design for angular, are still under
heavy development. Things may change/ break rather quickly because of it. So be patient :)

We stay in step with the dependencies of _angular/material_, _angular/angular-cli_ and _nrwl/nx_.

## Introduction

The current Memberhive is the redevelopment of [Memberhive1](https://github.com/digitaldeacon/memberhive1).
Memberhive is a **church relationship management system** (CRMS). Our focus is facilitating pastoral relationships within small and mid-sized churches.

Check out our [Roadmap](https://github.com/digitaldeacon/memberhive2/wiki/Roadmap) (no dates, see ceveat below).

## DEMO Environment

A demo environment is currently unavailable (check the High-Level Items list below).

## High-Level Items for February & March

_In order of importance_

- [ ] RBAC (#139) (in progress...)
- [ ] Translation (#9)
- [ ] GDPDR readiness (#165)
- [ ] New DEMO Environment
- [ ] Some rework (#156, #159, #163)

# Install

## Prerequisites

In order to set your dev environment you need to have the following things in order

- Node (see below)
- Composer
- PHP >= 7.1
- Yarn package manager
- any RDB system (we test against MySQL/MariaDB)
- NX Schematics ([Watch a 5-minute video on how to get started with Nx.](http://nrwl.io/nx))

### PHP

You need PHP 7.1, or higher, with the 'mbstring' and 'simplexml' extensions. Also Composer is required.

On Ubuntu you can install all of those with: `sudo apt install php7.1 php7.1-xml php7.1-mbstring composer`

On OSX you can get PHP7 via homebrew and composer like this `sudo curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer`

### Apache/Nginx

If you want to use/ test the compressions you need to have `mod_rewrite`, `mod_mime` and `mod_negotiation` enabled (Apache, see nginx for related req).
In case you want to have the server use `brotli` you also need to have **https** working.

## Environment installation

If you are on a \*nix based system (including OS X) you should use [nvm](<(https://github.com/creationix/nvm)>) to install NPM versions.
Checkout the github repo for detailed installation instructions concerning your environment.

We encourage you to use the latest NPM version (currently 9.x branch), until further notice.

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
nvm install 9.5.0
nvm use 9.5
nvm alias default 9.5
yarn global add angular-cli@latest @nrwl/schematics
git clone git@github.com:digitaldeacon/memberhive.git
cd memberhive
yarn && cd api && composer install
```

# DEMO Data

You can load some sample demo data by running the following command: `php api/yii demo/create-people`.

This will load 50 random profiles into the app. You can play with this data during development.

# Update/ Upgrade

In case you are updating from a version previsou to the changes from #166 then you should ideally remove everything and clone a fresh copy.
Additionally you should clean your dev env as well:

- first uninstall the cli globally
- clean your npm/ yarn cache
- add the latest version of angular-cli back in (globally, via yarn)
- make sure that you have your global TypeScript up to 2.6.2 (or whatever is the latest version we use now)
- remove your old (or any!) **node_modules** folder
- in case you used yarn before, make sure you **do not** have a .yarnclean file
- reinstall

# Developing

## Code scaffolding

Run `ng generate component component-name --app=web` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `yarn build:web` to build the project. The build artifacts will be stored in the `dist/` directory. This uses the `-prod` flag for a production build.

## Debugging API Requests

In dev mode the debug window is available under: http://localhost/memberhive/api/web/debug/default/view.
You can view all the latest requests there, as well as the runtime/logs folder.

## Developing with NgRX (Redux pattern)

Checkout this tutorial for a good overview: https://gist.github.com/btroncone/a6e4347326749f938510.
Install the [devTools for Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).

## Serve App

- `yarn start`
- serving with a specific language `yarn start:de`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Linting your code

**Everything (TS and PHP)**: `yarn lint:all`

**Typescript only**: `yarn lint`

**PHP only**: `yarn lint:php`

## Changes to DB

- Undo all migrations : `php api/yii migrate/down all --interactive=0`
- Then redo all migrations again: `php api/yii migrate`

## License

All files are made available under the terms of the GNU Affero General Public License (AGPL). See [LICENSE](https://github.com/digitaldeacon/memberhive2/blob/master/LICENSE).
I.e. you may fork but not resell.

[david-badge]: https://david-dm.org/digitaldeacon/memberhive2.svg
[david-badge-url]: https://david-dm.org/digitaldeacon/memberhive2
[david-dev-badge]: https://david-dm.org/digitaldeacon/memberhive2/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/digitaldeacon/memberhive2?type=dev
