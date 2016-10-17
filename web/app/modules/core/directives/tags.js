export function mhTags() {
  return {
    templateUrl: 'app/modules/core/templates/tags.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
      source: '@',
      placeholder: '@',
      field: '@',
      
    },
    controller: function($scope, Search) {"ngInject";
      if(!$scope.ngModel) {
        $scope.ngModel = [];
      }
      if(!$scope.field) {
        $scope.field = "tags";
      }
      $scope.searchTags = (query) => {
        return Search.searchValue($scope.source, $scope.field, query);
      };
    }

  };
}