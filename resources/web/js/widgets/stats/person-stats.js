export var PersonStatsWidget = angular.module('gem.person.widget.stats', []);

import {PersonStatsController} from './person-stats-controller';
/*
PersonStatsWidget.config((dashboardProvider, gettext) => {
  dashboardProvider.widget('person.stats', {
    title: gettext('Person Statistics'),
    description: gettext('Show Person Statistics'),
    templateUrl: 'app/modules/person/widgets/stats/view.html',
    controller: 'PersonStatsController as pc',
    resolve: {
      personCount: function(Person) {
        return Person.count();
      },
      householdCount: function(Household) {
        return Household.count();
      }
    }
  });
});
*/
PersonStatsWidget.controller('PersonStatsController', PersonStatsController);
