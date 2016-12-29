# Memberhive v0.2

- Angular2
- Yii2
- Typescript
- MySQL
- PHP
- Covalent/ Material2

## Initial Commit

The following seed projects were used to set this up:
- https://github.com/Teradata/covalent-quickstart
- https://github.com/mgechev/angular-seed

In the next commits we will remove unnecessary files and folders
 as we are defining our own structure.
 
## License
All files are made available under the terms of the GNU Affero General Public License (AGPL). See [LICENSE](https://github.com/digitaldeacon/memberhive2/blob/master/LICENSE).


# Install
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
git clone git@github.com:digitaldeacon/memberhive2.git
nvm install 6.9
nvm use 6.9
nvm alias default 6.9
npm i -g angular-cli@latest typescript tslint
npm install
cd api && composer install
```

# Developing

Serve App : `ng serve`