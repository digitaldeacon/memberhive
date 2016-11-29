
export function Shout($mdToast) {"ngInject";
  return {
    message: (msg, icon='info') => {
      $mdToast.show({
          templateUrl: 'app/modules/core/templates/shout.html',
          locals : {
            icon: icon,
            msg: msg,
            class: 'toast-info'
          },
          position: 'top right',
          hideDelay: 3000,
          controller: 'ShoutController',
          bindToController: true,
          controllerAs: 'ctrl'
      });
    },
    info: (msg, icon='info') => {
      $mdToast.show({
          templateUrl: 'app/modules/core/templates/shout.html',
          locals : {
            icon: icon,
            msg: msg,
            class: 'toast-info'
          },
          position: 'top right',
          hideDelay: 3000,
          controller: 'ShoutController',
          bindToController: true,
          controllerAs: 'ctrl'
      });
    },
    success: (msg) => {
      $mdToast.show({
          templateUrl: 'app/modules/core/templates/shout.html',
          locals : {
            icon: "check",
            msg: msg,
            class: 'toast-success'
          },
          position: 'top right',
          hideDelay: 3000,
          controller: 'ShoutController',
          bindToController: true,
          controllerAs: 'ctrl'
      });
    },
    warning: (msg) => {
      $mdToast.show({
          templateUrl: 'app/modules/core/templates/shout.html',
          locals : {
            icon: "warning",
            msg: msg,
            class: 'toast-warning'
          },
          position: 'top right',
          hideDelay: 3000,
          controller: 'ShoutController',
          bindToController: true,
          controllerAs: 'ctrl'
      });
    },
    error: (msg) => {
      $mdToast.show({
          templateUrl: 'app/modules/core/templates/shout.html',
          locals : {
            icon: "error",
            msg: msg,
            class: 'toast-warning'
          },
          position: 'top right',
          hideDelay: 3000,
          controller: 'ShoutController',
          bindToController: true,
          controllerAs: 'ctrl'
      });
    },
    vError: (err) => {
      var msg = "";
      if (err.data && err.data.error && err.data.error.message)
        msg = err.data.error.message;
        $mdToast.show({
          templateUrl: 'app/modules/core/templates/shout.html',
          locals : {
            icon: "error",
            msg: msg,
            class: 'toast-error'
          },
          position: 'top right',
          hideDelay: 3000,
          controller: 'ShoutController',
          bindToController: true,
          controllerAs: 'ctrl'
      });

    }
  };
}
