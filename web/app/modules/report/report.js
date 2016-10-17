import {ReportListController} from './controllers/report-list-controller';
import {ReportEditController} from './controllers/report-edit-controller';

import {QueryBuilderDirective} from './directives/querybuilder-directive';
import {VariableListDirective} from './directives/variablelist-directive';

import {ReportService} from './services/report-service';
import {QueryBuilderModelService} from './services/querybuilder-model-service';


export var mhReportModule = angular.module('mh.report', [
]);

mhReportModule.config(
  ($stateProvider, $provide, gettext) => {
    $stateProvider.state('report', {
      url: '/report',
      template: '<ui-view/>',
      abstract: true,
      data: {
        module: 'report',
        pageTitle: gettext('Report')
      }
    }).state('report.create', {
      url: '/create',
      controller: 'ReportEditController',
      controllerAs: 'reportCtrl',
      templateUrl: 'app/modules/report/views/report.upsert.html',
      data: {
        pageSubTitle: gettext('Create a new report')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveReport: (Report) => {
          return new Report();
        }
      }
    }).state('report.edit', {
      url: '/edit/:id',
      controller: 'ReportEditController',
      controllerAs: 'reportCtrl',
      templateUrl: 'app/modules/report/views/report.upsert.html',
      data: {
        pageSubTitle: gettext('Edit a report')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveReport: ($stateParams, ReportService) => {
          return ReportService.one($stateParams.id);
        }
      }
    }).state('report.list', {
      url: '/list',
      controller: 'ReportListController',
      controllerAs: 'reportCtrl',
      templateUrl: 'app/modules/report/views/report.list.html',
      data: {
        pageSubTitle: gettext('List available reports')
      },
      acl: {
        needRights: ['$authenticated']
      }
    });
  }
);

mhReportModule.controller('ReportListController', ReportListController);
mhReportModule.controller('ReportEditController', ReportEditController);

mhReportModule.directive('gemQuerybuilder', QueryBuilderDirective);
mhReportModule.directive('gemVariableList', VariableListDirective);

mhReportModule.factory('ReportService', ReportService);
mhReportModule.factory('QueryBuilderModelService', QueryBuilderModelService);
