# Memberhive v2
<img src="http://memberhive.com/images/mh-logo.png" alt="Logo Memberhive" width="300px" />

[![travis](https://travis-ci.org/digitaldeacon/memberhive2.svg?branch=master)](https://travis-ci.org/digitaldeacon/memberhive2)

## Note
MH2 is very much in Alpha status. **Help us develop this software!** Drop us an email (tomatosh at gmail com) and become a contributor. We'll supply you with the needed information (focus, standards, etc.).

Also note that Material2 (material design for angular2) is also still under active development. Things may change rather quickly there. So be patient :)
## Introduction
Memberhive2 is the redevelopment of [Memberhive1](https://github.com/digitaldeacon/memberhive). We dropped the nodejs backend for a PHP based one, upgraded to Angular2 (using TypeScript) and swicthed to a RDBMS. All this make development quicker and more robust.

Memberhive is a **church relationship management system** (CRMS). Out focus is facilitating pastoral relationships within small and mid-sized churches.

Check out our [Roadmap](https://github.com/digitaldeacon/memberhive2/wiki/Roadmap) (no dates, see ceveat below).

## Caveat
We started with MemberHive in 2015 because it was hard to find a church management system that was multi-lingual, had its focus on relationships, was affordable, had a modern UI and was technologically not outdated.

If you are interested in some of the projects we looked at you should check this [page](https://github.com/digitaldeacon/memberhive2/wiki/Similar-Software).

During the initial phase of our redevelopment in 2016 we came across a software that did exactly what we had planned to do. This software is called [ELVANTO](https://www.elvanto.com/eu/). 
Check it out and see if you want to use it. It is the kitchensink when it comes to church management.

So why continue with this project?

A fair question.

Here are some reasons:
+ **Complexity**. We do not know if the average church pastor (in middle Europe) will need/want the kind of complexity that Elvanto and others offer. These are software solutions for large churches.
+ **Relationships**. The above mentioned software majors on church planning, group management and events. Others focus function mainly as a CRM. What is missing here is a good relationship management (such as dsicipleship)
+ **Printed member lists**. Although Elvanto does a great job with reports, it does not fit our needs when it comes to a printed version of the church membership list.
+ **Tags**. Elvanto is missing a tag system. We kind of got used to that.
+ **UI (speed + design)**. This is not the strongest argument, but Angular/Material makes page naviagtion quick and clean.
+ **Closed Source**. Most other systems are closed source (understandably so). As we build on Open Source we want to give something back (of course, we will also cover the hosting for you, which will cost).

So the plan is to major on the above reasons. We want to be **simple**, enforce **easy realtionship management**, make **printed church lists** a breeze, stay with our **tag absed system**, and ... the rest seems obvious.

We will slowing down the development progress, for the moment. Unless we can **find more contributors**.

**So** if you share this reasons and see the value in it then **PLEASE DO CONTRIBUTE**! All of us here are pastorally involved in our churches. We have family and many other responsibilities. Any help will be welcome.

## Dependencies
- Angular2
- Yii2
- Typescript2
- MariaDB/MySQL
- PHP7
- Material2
 
## License
All files are made available under the terms of the GNU Affero General Public License (AGPL). See [LICENSE](https://github.com/digitaldeacon/memberhive2/blob/master/LICENSE).
I.e. you may fork but not resell.


# Install
If you are on a *nix based system (including OS X) you should use nvm to install NPM versions. Checkout the github repo for detailed installation instructions concerning your environment (https://github.com/creationix/nvm).

Also checkout the latest node LTS version (currently 6.9.x): https://nodejs.org/en/download/.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
git clone git@github.com:digitaldeacon/memberhive2.git
nvm install 6.9
nvm use 6.9
nvm alias default 6.9
npm i -g angular-cli@latest typescript@2.0.10 tslint
npm install
cd api 
composer install
```
# Update
If you have Memberhive2 installed and want to update the system you have two scripts as part of the package.json:
+ ```npm run clean-update``` (reinstall NPM and Composer packages)
+ ```npm run clean-install``` (reinstall NPM and Composer packages + new Angular-CLI)

# Developing

Serve App : `npm start`

Undo all migrations : `php api/yii migrate/down all --interactive=0`
Then redo all migrations again: `php api/yii migrate`
