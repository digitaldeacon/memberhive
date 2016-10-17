import './services/config-values';
import './controllers/site-settings-controller';

angular.module('mh.settings').config(
  ($stateProvider, gettext) => {
    $stateProvider.state('settings', {
      url: '/settings',
      template: '<div class="ui-view"></div>',
      data: {
        pageTitle: gettext('Configuration'),
        component: 'settings',
      },
      abstract: true
    }).state('settings.site', {
      url: '/site',
      templateUrl: 'app/modules/settings/views/site-settings.html',
      controller: 'SiteSettingsController',
      controllerAs: 'ctrl',
      data: {
        pageTitle: gettext('Site Config'),
        pageSubTitle: gettext('Edit site settings')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveMailchimp : () => {
          return {};
          //return MhConfigValues.getAll("mailchimp", {apiKey: ""});
        }
      },
    });
  }
);

