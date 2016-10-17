
export function mhGroupChips(GroupService) {"ngInject";
  return {
    templateUrl: 'app/modules/group/templates/group-chips.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
    },
    controller: ($scope) => {"ngInject";
      if(!$scope.ngModel) {
        $scope.ngModel= [];
      }
      $scope.filterSelected = true;
      $scope.querySearch = (query) => {
        var ret = GroupService.search(query);
        return ret;
      };
    }
  };
}





