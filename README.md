# Memberhive v0.2

- Angular2
- Yii2
- Typescript
- MariaDB
- PHP
- Material2
 
## License
All files are made available under the terms of the GNU Affero General Public License (AGPL). See [LICENSE](https://github.com/digitaldeacon/memberhive2/blob/master/LICENSE).


# Install
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
git clone git@github.com:digitaldeacon/memberhive2.git
nvm install 6.9
nvm use 6.9
nvm alias default 6.9
npm i -g angular-cli@latest typescript@2.0.10 tslint
npm install
cd api && composer install
```

# Developing

Serve App : `npm start`

Undo all migrations : `php yii migrate/down all --interactive=0`
