export function stateLoader($rootScope) {"ngInject";
  return {
    restrict: 'E',
    template: "<div ng-show='isStateLoading' class='loading-indicator'>" +
    "<div class='loading-indicator-body'>" +
    "<div class='spinner'><three-bounce-spinner></three-bounce-spinner></div>" +
    "</div>" +
    "</div>",
    replace: true,
    link: function(scope) {
      scope.isStateLoading = false;

      $rootScope.$on('$stateChangeStart', function() {
        scope.isStateLoading = true;
      });
      $rootScope.$on('$stateChangeSuccess', function() {
        scope.isStateLoading = false;
      });
    }
  };
}

export function appLoader($animate) {"ngInject";
  return {
      restrict: 'C',
      link: function link( scope, element, attributes ) {
        // Due to the way AngularJS prevents animation during the bootstrap
        // of the application, we can't animate the top-level container; but,
        // since we added "ngAnimateChildren", we can animated the inner
        // container during this phase.
        // --
        // NOTE: Am using .eq(1) so that we don't animate the Style block.
        $animate.leave( element.children().eq( 1 ) ).then(
          function cleanupAfterAnimation() {
            // Remove the root directive element.
            element.remove();
            // Clear the closed-over variable references.
            scope = element = attributes = null;
          }
        );
      }
  };
}
