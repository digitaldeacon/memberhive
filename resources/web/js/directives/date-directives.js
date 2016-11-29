export function utcDate() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ngModel) {
      var toView = function(val) {
        return val;
      };

      var toModel = function(val) {
        var offset = moment(val).utcOffset();
        var date = new Date(moment(val).add(offset, 'm'));
        return date;
      };

      ngModel.$formatters.unshift(toView);
      ngModel.$parsers.unshift(toModel);
    }
  };
}

export function mhDateInput() {"ngInject";
  return {
    template: '<md-datepicker ng-model="ngModel" md-placeholder="{{placeholder}}"></md-datepicker>',
    restrict: 'E',
    scope: {
      ngModel: '=',
      placeholder: '@'
    },
    controller: ($scope) => {"ngInject";
      if(!$scope.ngModel) {
        $scope.ngModel = new Date();
      } else {
        if(!angular.isDate($scope.ngModel)) {
          $scope.ngModel = new Date($scope.ngModel);
        }
      }
    }
  };
}

export function mhUtcDateInput() {"ngInject";
  return {
    template: '<md-datepicker ng-model="ngModel" md-placeholder="{{placeholder}}" utc-date></md-datepicker>',
    restrict: 'E',
    scope: {
      ngModel: '=',
      placeholder: '@'
    },
    controller: ($scope) => {"ngInject";
      if(!$scope.ngModel) {
        $scope.ngModel = new Date();
      } else {
        if(!angular.isDate($scope.ngModel)) {
          $scope.ngModel = new Date($scope.ngModel);
        }
      }
    }
  };
}