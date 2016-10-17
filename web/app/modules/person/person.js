import './filters/person-filters';
import {PersonListController} from './controllers/person-list-controller';
import {PersonEditController} from './controllers/person-edit-controller';
import {PersonViewController} from './controllers/person-view-controller';
import {PersonImportCSVController} from './controllers/person-import-csv-controller';
import {PersonImportImagesController} from './controllers/person-import-images-controller';
import {PersonExportCSVController} from './controllers/person-export-csv-controller';
import {PersonExportVCardController} from './controllers/person-export-vcard-controller';
import {PersonExportPDFController} from './controllers/person-export-pdf-controller';
import {HouseholdListController} from './controllers/household-list-controller';
import {HouseholdEditController} from './controllers/household-edit-controller';
import {PersonService} from './services/person-service';
import {PersonEditService} from './services/person-edit-service';
import {AvatarService} from './services/avatar-service';
import {mhPersonChips, mhPersonStatus, mhPersonListItem, mhPersonEditType, mhPersonHousehold, mhPersonGroup} from './directives/person-directives';
import {mhAvatar} from './directives/avatar-directives';
import {mhPersonSearch} from './directives/person-search-directive';
import {mhWidgetPersonRandom} from './widgets/random/person-random';
import {mhWidgetPersonNextBirthdays} from './widgets/nextBirthdays/nextBirthdays';
import {formatFacebookUrl, formatSkypeUrl, formatName, formatFirstName} from './filters/person-filters';

import './controllers/person-export-controller';
import './controllers/person-map-controller';
import './services/geolocation';

var mhPersonModule = angular.module('mh.person');

mhPersonModule.config((
  $stateProvider,
  $compileProvider,
  uiGmapGoogleMapApiProvider) => {"ngInject";
    $stateProvider.state('person', {
      url: '/person',
      template: '<ui-view/>',
      data: {
        //pageTitle: gettextCatalog.getString('Persons'),
        component: 'person',
      },
      abstract: true
    }).state('person.list', {
      url: '/list',
      templateUrl: 'app/modules/person/views/person.list.html',
      controller: 'PersonListController',
      controllerAs: 'personCtrl',
      data: {
        //pageTitle: gettextCatalog.getString('Persons'),
        //pageSubTitle: gettextCatalog.getString('Create and edit Persons')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolvePersons: (PersonService, resolveQuery) => {
          return PersonService.getAllFilterd(resolveQuery);
        },
        resolveQueryModel: (AccountOptions) => {
          return AccountOptions.get('person_list_query', []);
        },
        resolveQuery : (resolveQueryModel, SearchQuery, q) => {
          return q.all(SearchQuery.generateQuery(resolveQueryModel));
        }
      },
    }).state('person.view', {
      url: '/view/:id/',
      templateUrl: 'app/modules/person/views/person.view.html',
      controller: 'PersonViewController',
      controllerAs: 'personCtrl',
      data: {
        //pageSubTitle: gettextCatalog.getString('View Person details')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolvePerson: ($stateParams, PersonEditService) => {
          return PersonEditService.getPerson($stateParams.id);
        },
        resolveNotes : ($stateParams, Person) => {
          return Person.notes({"id": $stateParams.id}).$promise;
        }
      },
    }).state('person.create', {
      url: '/create',
      controller: 'PersonEditController',
      controllerAs: 'personCtrl',
      templateUrl: 'app/modules/person/views/person.edit.html',
      data: {
        //pageSubTitle: gettextCatalog.getString('Create a Person')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolvePerson: (Person) => {
          return new Person();
        }
      },

    }).state('person.edit', {
      url: '/edit/:id',
      controller: 'PersonEditController',
      controllerAs: 'personCtrl',
      templateUrl: 'app/modules/person/views/person.edit.html',
      data: {
        //pageSubTitle: gettextCatalog.getString('Edit a Person')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolvePerson: ($stateParams, PersonEditService) => {
          return PersonEditService.getPerson($stateParams.id);
        }
      },
    }).state('person.import', {
      url: '/import',
      templateUrl: 'app/modules/person/views/person.import.html',
      data: {
        //pageSubTitle: gettextCatalog.getString('Import Persons')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('person.export', {
      url: '/export',
      templateUrl: 'app/modules/person/views/person.export.html',
      controller: 'PersonExportController',
      controllerAs: 'exportCtrl',
      data: {
        //pageSubTitle: gettextCatalog.getString('Export Persons')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveQueryModel: (AccountOptions) => {
          return AccountOptions.get('person_list_query', []);
        }
      }
    }).state('person.households', {
      url: '/households',
      controller: 'HouseholdListController',
      controllerAs: 'householdCtrl',

      templateUrl: 'app/modules/person/views/household.list.html',
      data: {
        //pageTitle: gettextCatalog.getString('Households'),
        //pageSubTitle: gettextCatalog.getString('View Households')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveHouseholds: (PersonService) => {
          return PersonService.getHouseholds();
        }
      }
    }).state('person.household-edit', {
      url: '/household/edit/:householdId',
      controller: 'HouseholdEditController',
      controllerAs: 'householdCtrl',
      templateUrl: 'app/modules/person/views/household.edit.html',
      data: {
       // pageTitle: gettextCatalog.getString('Households'),
        //pageSubTitle: gettextCatalog.getString('Edit Household')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveHousehold: (PersonService, $stateParams) => {
          return PersonService.getHousehold($stateParams.householdId);
        },
        resolvePersons: (Household, $stateParams) => {
          return Household.persons({id: $stateParams.householdId}).$promise;
        }
      }
    }).state('person.household-create', {
      url: '/household/create',
      controller: 'HouseholdEditController',
      controllerAs: 'householdCtrl',
      templateUrl: 'app/modules/person/views/household.edit.html',
      data: {
        //pageTitle: gettextCatalog.getString('Households'),
        //pageSubTitle: gettextCatalog.getString('Create Household')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveHousehold: (Household) => {
          return new Household();
        }
      }

    }).state('person.search', {
      url: '/search',
      templateUrl: 'app/modules/person/views/person.search.html',
      data: {
        //pageTitle: gettextCatalog.getString('Search'),
       // pageSubTitle: gettextCatalog.getString('Search')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('person.map', {
      url: '/map',
      templateUrl: 'app/modules/person/views/person.map.html',
      controller: 'PersonMapController',
      controllerAs: 'ctrl',
      data: {
        //pageTitle: gettextCatalog.getString('Search'),
       // pageSubTitle: gettextCatalog.getString('Search')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolvePersons: (PersonService, resolveQuery) => {
          return PersonService.getAllFilterd(resolveQuery);
        },
        resolveQueryModel: (AccountOptions) => {
          return AccountOptions.get('person_list_query', []);
        },
        resolveQuery : (resolveQueryModel, SearchQuery, q) => {
          return q.all(SearchQuery.generateQuery(resolveQueryModel));
        }
      },
    });

    // Allow skype urls http://stackoverflow.com/a/15769779
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|skype):/);

    uiGmapGoogleMapApiProvider.configure({
      //    key: 'your api key',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
  }
);
mhPersonModule.controller('PersonListController', PersonListController);
mhPersonModule.controller('PersonViewController', PersonViewController);

mhPersonModule.controller('PersonEditController', PersonEditController);


mhPersonModule.controller('PersonImportCSVController', PersonImportCSVController);
mhPersonModule.controller('PersonImportImagesController', PersonImportImagesController);
mhPersonModule.controller('PersonExportVCardController', PersonExportVCardController);
mhPersonModule.controller('PersonExportCSVController', PersonExportCSVController);
mhPersonModule.controller('PersonExportPDFController', PersonExportPDFController);
mhPersonModule.controller('HouseholdListController', HouseholdListController);
mhPersonModule.controller('HouseholdEditController', HouseholdEditController);

mhPersonModule.factory('PersonService', PersonService);
mhPersonModule.service('PersonEditService', PersonEditService);
mhPersonModule.factory('AvatarService', AvatarService);

mhPersonModule.directive('mhAvatar', mhAvatar);
mhPersonModule.directive('mhPersonChips', mhPersonChips);
mhPersonModule.directive('mhPersonStatus', mhPersonStatus);
mhPersonModule.directive('mhPersonHousehold', mhPersonHousehold);
mhPersonModule.directive('mhPersonGroup', mhPersonGroup);
mhPersonModule.directive('mhPersonListItem', mhPersonListItem);
mhPersonModule.directive('mhPersonEditType', mhPersonEditType);
mhPersonModule.directive('mhPersonSearch', mhPersonSearch);

mhPersonModule.directive('mhWidgetPersonRandom', mhWidgetPersonRandom);
mhPersonModule.directive('mhWidgetPersonNextBirthdays', mhWidgetPersonNextBirthdays);

mhPersonModule.filter('formatFacebookUrl', formatFacebookUrl);
mhPersonModule.filter('formatSkypeUrl', formatSkypeUrl);
mhPersonModule.filter('formatName', formatName);
mhPersonModule.filter('formatFirstName', formatFirstName);


