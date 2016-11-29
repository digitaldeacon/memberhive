import './controller/login-controller';

angular.module('mh.auth').config(
  ($stateProvider, gettext) => {
      $stateProvider.state('login', {
        url: '/login',
        data: {
          pageTitle: gettext('Login'),
        },
        views: {
          'login': {
             templateUrl: 'app/modules/auth/views/login.html',
             controller: 'LoginController',
             controllerAs: 'loginCtrl'
          }
        },
        acl: {
          needRights: []
        }
      });
    }
);

