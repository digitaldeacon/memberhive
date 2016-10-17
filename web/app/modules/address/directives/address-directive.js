export function AddressDirective() {"ngInject";
  return {
    restrict: 'E',
    scope: {
      address: '='
    },
    templateUrl: 'app/modules/address/directives/address.html',
    replace: true
  };
}

export function AddressEditDirective() {"ngInject";
  return {
    restrict: 'E',
    scope: {
      address: '='
    },
    templateUrl: 'app/modules/address/directives/address_edit.html',
    replace: true
  };
}
