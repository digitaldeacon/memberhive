
export function mhPersonChips(mhConfig, PersonService) {"ngInject";
  return {
    templateUrl: 'app/modules/person/templates/person-chips.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
    },
    controller: ($scope)=> {"ngInject";
      if(!$scope.ngModel) {
        $scope.ngModel= [];
      }
      $scope.filterSelected = true;

      $scope.querySearch = (query) => {
        return PersonService.search(query);
      };

    }
  };
}


export function mhPersonStatus() {
  return {
    templateUrl: 'app/modules/person/templates/person-status.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
      placeholder: '@'
    },
    controller: function($scope, PersonService) {"ngInject";
      if(!$scope.ngModel) {
        $scope.ngModel = [];
      }
      $scope.searchStatus = (query) => {
        return PersonService.searchStatus(query);
      };
    }

  };
}

export function mhPersonGroup() {
  return {
    templateUrl: 'app/modules/person/templates/person-groups.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
      placeholder: '@'
    },
    controller: function($scope, PersonService) {"ngInject";
      if(!$scope.ngModel) {
        $scope.ngModel = [];
      }
      $scope.searchGroup = (query) => {
        return PersonService.searchGroup(query);
      };
      $scope.transform = (chip) => {
        if(!chip.name)
          return {"name": chip};
        else
          return chip;
      };
    }

  };
}


export function mhPersonListItem() {
  return {
    templateUrl: 'app/modules/person/templates/person-list-item.html',
    restrict: 'E',
    scope: {
      person: '=',
    }
  };
}

export function mhPersonEditType() {
  return {
    templateUrl: 'app/modules/person/templates/person-edit-type.html',
    restrict: 'E',
    scope: {
      key: '=',
      type: '@'
    },
    controller: function($scope, PersonService) {"ngInject";
      $scope.personService = PersonService;
    }

  };
}
export function mhPersonHousehold() {
  return {
    templateUrl: 'app/modules/person/templates/person-household.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
    },
    controller: function($scope, PersonService) {"ngInject";
      if(!$scope.ngModel) {
        $scope.ngModel = [];
      }
      $scope.searchHousehold = (query) => {
        return PersonService.searchHousehold(query);
      };
      $scope.transform = (chip) => {
        if(!chip.name)
          return {"name": chip};
        else
          return chip;
      };
    }

  };
}



