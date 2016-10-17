export function mhSearchBox() {"ngInject";
  return {
    templateUrl: 'app/modules/core/templates/search-box.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
      fields: '@',
      label: '@'
    },
    controller: function($scope, Search) {"ngInject";
      if(!$scope.ngModel) {
        $scope.ngModel = [];
      }

      $scope.search = (query) => {
        return Search.search(query);
      };
    }
  };
}

export function mhSearchChips() {"ngInject";
  return {
    templateUrl: 'app/modules/core/templates/search-chips.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
      fields: '@',
      label: '@'
    },
    controller: function($scope, Search) {"ngInject";
      if(!$scope.ngModel) {
        $scope.ngModel = [];
      }

      $scope.search = (query) => {
        return Search.search(query);
      };
    }
  };
}
