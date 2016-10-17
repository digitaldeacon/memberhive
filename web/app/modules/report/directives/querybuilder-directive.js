export function QueryBuilderDirective() {"ngInject";
  /*return {
    templateUrl: '/queryBuilderDirective.html',
    controller: 'ReportUpsertController',
    bindToController: true,
    restrict: 'E',
    compile: function compile(tElement, tAttr, transclude) {
      return {
        post: function postLink(scope,iElement,iAttrs,controller) {
          iElement.queryBuilder({
            allow_empty: true,//jshint ignore:line
            plugins: ['sortable'], //bt-tooltip-errors
            filters: controller.setBuilderFilters(),
            lang_code: $rootScope.locale.lang // jshint ignore:line
          });

          if (controller.report) {
            controller.report.$promise.then(data => {
              iElement.queryBuilder('setRules',data.rule);
            });
          }

          var saveBtn = angular.element(document.querySelector('.parse-json'));
          var resetBtn = angular.element(document.querySelector('.reset'));

          var onSaveButtonClick = function() {
            if (scope.reportBuilderForm.$invalid)
              return;
            scope.reportUpCtrl.report.rule = iElement.queryBuilder('getRules');
            scope.reportUpCtrl.report.query = iElement.queryBuilder('getLoopback');
          };
          var onResetButtonClick = function() {
            iElement.queryBuilder('reset');
          };

          saveBtn.on('click', onSaveButtonClick);
          resetBtn.on('click', onResetButtonClick);

          scope.$on('$destroy', function() {
            saveBtn.off('click', onSaveButtonClick);
            resetBtn.off('click', onResetButtonClick);
          });
        }
      };
    }



  };*/
}
