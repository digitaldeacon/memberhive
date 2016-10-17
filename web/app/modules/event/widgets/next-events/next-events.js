var mhWidgetNextEvents = function () {
  return {
    templateUrl: 'app/modules/event/widgets/next-events/view.html',
    restrict: 'E',
    controller: ($scope, EventService, EventStatusOptions) => {"ngInject";
      EventService.future({limit: 10}).then(d => $scope.nextEvents = d);
      $scope.countStatus = EventService.countStatus;
      $scope.statusOptions = EventStatusOptions;

    },
  };
};

angular.module('mh.event').directive('mhWidgetNextEvents', mhWidgetNextEvents);
