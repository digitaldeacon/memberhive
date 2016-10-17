/**
 * This directive lists the available variables from the QueryBuilder.
 */
export function VariableListDirective() {"ngInject";

  return {
    restrict: 'E',
    scope: {
      dataSources: '=sources'
    },
    templateUrl: 'app/modules/report/directives/variablelist-template.html'
  };
}
