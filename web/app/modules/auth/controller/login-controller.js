var loginController = function (
  Account, 
  $state, 
  MhAcl, 
  Shout, 
  gettextCatalog, 
  $rootScope, 
  LoopBackAuth, 
  AccountOptions
) {"ngInject";

  this.rememberMe = true;
  this.login = () => {
    Account.login(
      {rememberMe: this.rememberMe},
      {username: this.username, password: this.password}
    )
    .$promise.then(
      (resp) => {
        this.error = false;
        $rootScope.accessToken = LoopBackAuth.accessTokenId;
        Account.roles({'user_id': resp.user.id})
          .$promise.then((resp) => {
            MhAcl.setRights(resp.roles);
            AccountOptions.load();
            $state.go('dashboard');
          });
      },
      (err) => {
        if (err.status === 401)
          Shout.error(gettextCatalog.getString('Could not login. Please check your username and password.'));
        else
          Shout.error(gettextCatalog.getString('Could not login. Please check your connection.'));
      }
    );
  };
};

angular.module('mh.auth').controller('LoginController', loginController);
