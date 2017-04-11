# Memberhive v2

[![Join the chat at https://gitter.im/memberhive2/Lobby](https://badges.gitter.im/memberhive2/Lobby.svg)](https://gitter.im/memberhive2/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<img src="http://memberhive.com/images/mh-logo.png" alt="Logo Memberhive" width="300px" />

[![travis](https://travis-ci.org/digitaldeacon/memberhive2.svg?branch=master)](https://travis-ci.org/digitaldeacon/memberhive2) 
[![Dependency Status][david-badge]][david-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]

## Note
MH2 is very much in Alpha status. Many dependencies, like Material2 (material design for angular2) are still under 
active development. Things may change/ break rather quickly because of it. So be patient :)

We stay in setp with the dependencies of _angular/material2_ and _angular/angular-cli_.

## Introduction
Memberhive2 is the redevelopment of [Memberhive1](https://github.com/digitaldeacon/memberhive). We dropped the nodejs backend for a PHP based one, upgraded to Angular2 (using TypeScript) and switched to a RDBMS (MySQL/MariaDB). All this makes development quicker and more robust.

Memberhive is a **church relationship management system** (CRMS). Our focus is facilitating pastoral relationships within small and mid-sized churches.

Check out our [Roadmap](https://github.com/digitaldeacon/memberhive2/wiki/Roadmap) (no dates, see ceveat below).

## High-Level Items for April
_In order of importance_
- [ ] Structure rework for Ionic2 and shared code (#64)
- [ ] State management (#65)
- [x] Layout fixes desktop (#56)
- [x] Layout fixes mobile (#56)
- [x] Upgrade to Angular4 (#63)
- [ ] Dashboard: Interactions (#60)
- [ ] Interactions (#19)
- [ ] Display fixes Safari (input elements) (#56)

## Development Philosophy
We want to keep this project simple (even though it will be large) and maintainable. For that reason
we want to adher to the following rules:
+ KISS (you know what that means)
+ **Try to avoid** add new dependencies, unless absolutely needed
+ **Do not use** any large libraries to accomplish something that you could accomplish with what is already included
+ **Lint** your code

## Contribute
If you care to contribute you should bring some of the following skills to the table:
+ Good experience with Angular development
+ Experience in RDBMS design
+ Ideally also experience with Yii2 (or similar frameworks)
+ Have some sense for SCSS and styling with Material Design
+ Have a desire to work with Ionic2 and the idea of a hybrid app (web + mobile + common code)
+ Understand (or want to learn) Redux-like state managements (using NgRX)

See also *Dependencies* below.

## Dependencies
- Angular (v4.0.0, with angular/cli and AOT compilation)
- Ionic (v2)
- Yii2
- Typescript2 (2.2.1)
- MariaDB/MySQL
- PHP7 (7.0)
- Material2 (using angular/flex-layout)
- NgRX (Redux-like state management)

# Install

## Prerequisites
### Node/NPM
You will need to have node installed, in order to get NPM as package manager. [Check this out](https://docs.npmjs.com/getting-started/installing-node) for instructions on how to install node.

Also refer to the heading below (Package Managing) for additional infos.

We use **YARN** now (install via npm - funny, i know), but you are not absolutely required to use it.

### PHP
You need PHP 7 with the 'mbstring' and 'simplexml' extensions. Also Composer is required.

On Ubuntu you can install all of those with: `sudo apt install php7.0 php7.0-xml php7.0-mbstring composer`

### DB
Of course you also need a RDB system, such as MySQL/ MariaDB (which we test against). But since Yii2 can deal with any 
system, and we are not using system specific features (such as JSON fields), you are welcome to use another system 
(at your own risk).

### Package Managing
You have two choices for a manager: ***npm*** or ***yarn***. 

In case you want to try yarn (which we do now) you can follow the installation instructions [here](yarnpkg.com). 
Yarn has some speed improvements and produces a lock file, which e.g. Travis will automatically read.

## Installation
If you are on a *nix based system (including OS X) you should use nvm to install NPM versions. Checkout the github 
repo for detailed installation instructions concerning your environment (https://github.com/creationix/nvm).

Also checkout the latest node LTS version (currently 6.9.x): https://nodejs.org/en/download/.
This repo has been checked against Node v.7.7.1 (npm v.4.4.1).

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
nvm install 6.9
nvm use 6.9
nvm alias default 6.9
npm i -g angular-cli@latest typescript@2.2.1 tslint
git clone git@github.com:digitaldeacon/memberhive2.git
cd memberhive2
cd api 
composer install
```
Using YARN
```
yarn install:all
```
Using NPM
... if you care to use npm, you may add the scripts yourself. Maybe we'll add it later again.

Now you should have the client and the Yii backend in place. Next you need to create a database:

Under 'api/config/examples' you will find `db_local.example.php`. Copy this file to the parent folder (config) and edit 
this according to your needs (renaming it to `db_local.php` of course).

After you have a DB you need to run: `php api/yii migrate`. This will create all necessary tables and set a default user
with the following credentials: `root/ bibel`.

You will also need an **Email Service**, either local or online. For that you need to copy the file `mail_local.example.php`
to its parent directory and adjust it as needed (renaming it to `mail_local.php` of course).

# DEMO Data
You can load some sample demo data by running the following command: `php api/yii demo/create-people`.

This will load 50 random profiles into the app. You can play with this data during development.

# Update/ Upgrade
In case you are updating from a version that was dependent on Angular2.4 you need to make sure that you follow the [instructions](https://github.com/angular/angular-cli/wiki/stories-1.0-update) from the angular/angular-cli project closely. This requires that you:
+ first uninstall the cli globally
+ clean your npm cache
+ add the latest version of angular-cli back in (globally)
+ make sure that you have your global TypeScript up to 2.2.1 (in case you have one globally installed)
+ remove your old (or any!) __node_modules__ folder
+ in case you used yarn before, make sure you **do not** have a .yarnclean file
+ reinstall (via ***npm*** or ***yarn*** - see above)

## YARN (what we use now)
+ `yarn upgrade:all` (which will automatically remove your node_modules/ folder).
+ `yarn install:all` (which will automatically remove your node_modules/ folder).
...or any of the other subcommands (see package.json in root directory).

## NPM
+ ```npm run npm.update:all``` (reinstall NPM and Composer packages)
+ ```npm run npm.install:all``` (reinstall NPM and Composer packages + new Angular-CLI)
...or any of the other subcommands (see package.json in root directory).

# Developing
## Developing with NgRX (Redux pattern)
Checkout this tutorial for a good overview: https://gist.github.com/btroncone/a6e4347326749f938510.

Install the [devTools for Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).

Development has become a litte different. All the state altering logic has moved
 to the core module now (./core). The core will be symlinked to the web and the mobile apps.
 That means:
 + when you make changes you will need to **build the core first** (see "Changes to Core") 
 before you get updated data
 + whatever is on the core can be accessed by mobile and web
 + all state is now stored as a single observable (one source of truth)
 + every action (like updating, fetching, etc) needs to be defined with actions and reducers
 + no state should be mutated directly (e.g. people.push()), but must be done via the reducer methods
 
We are not done with moving everything. This will completed by the end of the month.
We understand that this move makes the application more complex. The hope is that 
it will pay off as we grow the functionality and the complexity of state.

## Serve App
+ `yarn start:web` or `yarn start:mobile` or `yarn start:all`
+ `npm npm.start:web` or `npm npm.start:mobile` or `npm npm.start:all`

## Linting your code
**Everything (TS and PHP)**: `yarn lint:all` (or one of :web, :core, :mobile or :all])

**Typescript**: `yarn tslint:all` or `npm run npm.tslint:all` (or one of :web, :core, :mobile or :all])

**PHP**: `yarn phplint` or `npm run phplint`

## Changes to Core 
Whenever you change something in the core folder you are required to rebuild the package **AND** also 
restart the web `yarn start:web` or `yarn start` (when in the web folder).

**UNLESS** you use `node_modules/typescript/bin/tsc -w`, which will compile and watch. That only works
for the web so far. Ionic does not seem to reload (yet).

In a Yarn environment you would either be in /core and `yarn build`, or
be in the root and `yarn build:core`.

If you don't do that your changed code will not show up in the web or mobile app.

**WORKAROUND**
You copy the core folder into the web: `cp core/src web/src/app/core`. But you will need to change the
import paths manually. After you're done with your section just copy the core files back to the 
core folder in root.

## Changes to DB

+ Undo all migrations : `php api/yii migrate/down all --interactive=0`
+ Then redo all migrations again: `php api/yii migrate`

## Caveat
We started with MemberHive in 2015 because it was hard to find a church management system that was multi-lingual, had its focus on relationships, was affordable, had a modern UI and was technologically not outdated.

If you are interested in some of the projects we looked at you should check this [page](https://github.com/digitaldeacon/memberhive2/wiki/Similar-Software).

During the initial phase of our redevelopment in 2016 we came across a software that did exactly what we had planned to do. This software is called [ELVANTO](https://www.elvanto.com/eu/). 
Check it out and see if you want to use it. It is the kitchensink when it comes to church management.

So why continue with this project?

A fair question.

Here are some reasons:
+ **Complexity**. We do not know if the average church pastor (in middle Europe) will need/want the kind of complexity that Elvanto and others offer. These are software solutions for large churches.
+ **Relationships**. The above mentioned software majors on church planning, group management and events. Others function mainly as a CRM. What is missing here is a good relationship management (e.g. discipleship)
+ **Printed member lists**. Although Elvanto does a great job with reports, it does not fit our needs when it comes to a printed version of the church membership list.
+ **Tags**. Elvanto is missing a tag system. We kind of got used to that.
+ **UI (speed + design)**. This is not the strongest argument, but Angular/Material makes page naviagtion quick and clean.
+ **Closed Source**. Most other systems are closed source (understandably so). As we build on Open Source we want to give something back (of course, we will also cover the hosting for you, which will cost).

So the plan is to major on the above reasons. We want to be **simple**, enforce **easy realtionship management**, make **printed church lists** a breeze, stay with our **tag based system**, and ... the rest seems obvious.

We will be slowing down the development progress, for the moment. Unless we can **find more contributors**.

**So** if you share this reasons and see the value in it then **PLEASE DO CONTRIBUTE**! All of us here are pastorally involved in our churches. We have family and many other responsibilities. Any help will be welcome.

## License
All files are made available under the terms of the GNU Affero General Public License (AGPL). See [LICENSE](https://github.com/digitaldeacon/memberhive2/blob/master/LICENSE).
I.e. you may fork but not resell.

[david-badge]: https://david-dm.org/digitaldeacon/memberhive2.svg
[david-badge-url]: https://david-dm.org/digitaldeacon/memberhive2
[david-dev-badge]: https://david-dm.org/digitaldeacon/memberhive2/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/digitaldeacon/memberhive2?type=dev