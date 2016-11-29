// Translations
import './translations/en/en';
import './translations/de/de';
import './scripts/lb-services';
import './modules/modules';

import './modules/core/core';
import './modules/core/error-shipper';
import './scripts/config';
import './modules/dashboard/dashboard';
import './modules/address/address';
import './modules/person/person';
import './modules/auth/auth';
import './modules/auth/acl';
import './modules/note/note';
import './modules/group/group';
import './modules/report/report';
import './modules/event/event';
import './modules/settings/settings';

/**
 * The main app module.
 */
export var mhMainModule = angular.module('mh.main', [
  'mhErrorShipper',
  'ngAnimate',
  'ngMaterial',
  'ngResource',
  'ngSanitize',
  'ngLocale',
  'ngAria',
  'ui.router',
  'lbServices',
  'angular-loading-bar',
  'gettext',
  'ngMdIcons',
  'angular-keyboard',
  'infinite-scroll',
  'angularMoment',
  'ngRetina',
  angularDragula(angular),
  'mh.core', // This needs to be loaded first
  'mh.dashboard', 'mh.person', 'mh.event', 'mh.acl',
  'mh.auth', 'mh.report', 'mh.note', 'mh.group', 'mh.settings',
  ]
);

mhMainModule.config(function (
  cfpLoadingBarProvider,
  mhConfig,
  LoopBackResourceProvider,
  $mdDateLocaleProvider,
  moment,
  $stateProvider,
  $compileProvider,
  $urlRouterProvider,
  $mdThemingProvider ) {

  if(mhConfig.production) {
    $compileProvider.debugInfoEnabled(false);
  } else {
    $compileProvider.debugInfoEnabled(true);
  }
  
  cfpLoadingBarProvider.includeSpinner = false;
  if(!mhConfig.apiUrl) {
    console.error("API URL not definied");
  } else {
    LoopBackResourceProvider.setUrlBase(mhConfig.apiUrl);
  }

  $mdDateLocaleProvider.parseDate = (dateString) => {
    var m = moment(dateString, 'l', true);
    return m.isValid() ? m.toDate() : new Date(NaN);
  };
  $mdDateLocaleProvider.formatDate = (date) => {
    return moment(date).format('l');
  };

  $urlRouterProvider.otherwise('/dashboard');
  $urlRouterProvider.when('', '/dashboard');

  //main color is: #F8922F
  //complementär: #0085AB
  //Generator for palettes http://knizia.biz/mcg/
  $mdThemingProvider.definePalette('mh-orange', {
    '50': 'FDF0E3',
    '100': 'FCDCBD',
    '200': 'FBC896',
    '300': 'F9B16C',
    '400': 'F8A14D',
    '500': 'F8922F',
    '600': 'E1842A',
    '700': 'C97626',
    '800': 'B06721',
    '900': '814C18',

    'A100': 'F8922F',
    'A200': 'F8922F',
    'A400': 'F8922F',
    'A700': 'F8922F',

    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('mh-orange')
    .warnPalette('red')
    .backgroundPalette('grey');

});

mhMainModule.run(function(
  $rootScope,
  $state,
  MhAcl,
  Account,
  AccountOptions,
  LoopBackAuth,
  gettextCatalog,
  amMoment,
  $window,
  mhConfig
) {
  if(mhConfig.production) {
    gettextCatalog.debug = false;
  } else {
    gettextCatalog.debug = true;
  }
  $rootScope.$state = $state; // state to be accessed from view
  $rootScope.accessToken = LoopBackAuth.accessTokenId;

  let p = Account.roles({'user_id': LoopBackAuth.currentUserId}).$promise;
  MhAcl.setRightsPromise(p);
  $rootScope.acl = MhAcl;
  $rootScope.options = AccountOptions;


  // Set up languages
  let locales = {
    'en': {
      lang: 'en',
      country: 'US',
      name: gettextCatalog.getString('English')
    },
    'de': {
      lang: 'de',
      country: 'DE',
      name: gettextCatalog.getString('German')
    }
  };

  let DEFAULT_LANG = 'de';
  let lang = $window.navigator.language || $window.navigator.userLanguage || DEFAULT_LANG;
  var locale = locales[lang] || locales[DEFAULT_LANG];
  $rootScope.locale = locale;
  gettextCatalog.setCurrentLanguage(locale.lang);
  $window.moment.locale(locale.lang);
  amMoment.changeLocale(locale.lang);



});
