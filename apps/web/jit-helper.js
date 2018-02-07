const fs = require('fs');
const path = require('path');
const argv = JSON.parse(process.env.npm_config_argv).original;

let locale = getArgValue('locale');
let i18nFile = getArgValue('i18nFile');
let i18nFormat = getArgValue('i18nFormat');

/*console.log(JSON.parse(process.npm_config_argv));
console.log('locale', locale);
console.log('file', i18nFile);
console.log('format', i18nFormat);*/

fs.writeFileSync(path.resolve(__dirname, './src/environments/jit-locale-data.ts'), `export const LOCALE_DATA = {
  locale: ${locale ? `"${locale}"` : null},
  i18nFile: ${i18nFile ? `"${i18nFile.replace(new RegExp("^(\./)?src/i18n/"), '')}"` : null},
  i18nFormat: ${i18nFormat ? `"${i18nFormat}"` : null}
};
export const IS_AOT = ${hasArg('aot')};
`);


function getArgValue(key) {
    let value;
    key = formatArg(key);
    argv.forEach((arg, index) => {
        arg = formatArg(arg);
        if (arg === key) {
            value = argv[index + 1];
        } else if (arg.match(`${key}=`)) {
            value = arg.replace(`${key}=`, '');
        }
    });
    return value;
}

function formatArg(str) {
    return str.replace(/^--/, '')
        .replace(/-./g, match => match[1].toUpperCase());
}

function hasArg(str) {
    return argv.some(arg => formatArg(arg).replace(/=.*/, '') === formatArg(str));
}
