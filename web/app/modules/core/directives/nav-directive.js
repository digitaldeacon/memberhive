
export function mhMenuItem($mdSidenav) {"ngInject";
  return {
    restrict: 'E',
    scope: {
      'item': '=',
      'collapsing': '='
    },
    templateUrl: 'app/modules/core/templates/menu-item.html',
    link: function($scope) {
      var scope = $scope.$new();
      scope.open = false;
      scope.iconVisible = false;
      scope.icon = 'keyboard_arrow_down';
      scope.forceClosed = false;
      $scope.isOpen = function() {
        return scope.open;
      };

      $scope.icon = () => {
        return scope.icon;
      };

      $scope.iconVisible = () => {
        return scope.iconVisible;
      };

      $scope.toggle = function() {
        scope.open = !scope.open;
        if(scope.open) {
           scope.icon = 'keyboard_arrow_right';
        } else {
           scope.icon = 'keyboard_arrow_down';
        }
      };
      $scope.closeMenuBar = function() {
        $mdSidenav('left').close();
      };

      scope.$watch('collapsing',()=>{
        if(scope.collapsing) {
          scope.forceClosed = scope.open;
          scope.open = false;
          scope.iconVisible = false;
          scope.icon = 'keyboard_arrow_down';
        } else {
          scope.iconVisible = true;
          if(scope.forceClosed) {
            scope.forceClosed = false;
            scope.open = true;
          }
        }
      });
    }
  };
}

export function mhMenuIconItem() {"ngInject";
  return {
    restrict: 'E',
    scope: {
      'item': '='
    },
    templateUrl: 'app/modules/core/templates/menu-icon-item.html',
  };
}

