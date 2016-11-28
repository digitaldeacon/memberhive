export function mhWidgetPersonRandom() {"ngInject";
  return {
    templateUrl: 'app/modules/person/widgets/random/view.html',
    restrict: 'E',
    scope: {
      person: '=',
    },
    controller: function($scope, Person) {"ngInject";
      $scope.randomPerson = Person.random();
    }
  };
}
