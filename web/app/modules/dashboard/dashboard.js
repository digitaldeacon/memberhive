import {DashboardController} from './controllers/dashboard-controller';
import {mhWidget} from './directives/dashboard-directives';

export var mhDashboardModule = angular.module('mh.dashboard', []);
mhDashboardModule.config(($stateProvider, gettext) => {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/modules/dashboard/views/dashboard.html',
      data: {
        pageTitle: gettext('Dashboard')
      },
      ncyBreadcrumb: {
        label: gettext('Home')
      },
      acl: {
        needRights: ['$authenticated']
      }
    });
});

mhDashboardModule.controller('DashboardController', DashboardController);
mhDashboardModule.directive('mhWidget', mhWidget);
