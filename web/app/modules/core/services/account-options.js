export function AccountOptions(
  Account,
  LoopBackAuth,
  $log
) {"ngInject";

  /**
   * This Service is also in $rootScope as options
   */

  this.account = null;
  /**
   * Warning: The key should not contains dots, as mongo won't accept it
   */
  this.set = (key, value) => {
    if(_.includes(key, '.')) {
      $log.error("AccountOptions has a key: " + key + " with a dot inside");
      return;
    }
    this.promise.then(() => {
      if(this.account.options === undefined) {
        this.account.options = {};
      }
      this.account.options[key] = value;
      Account.update({where:{id: this.account.id}}, this.account);
    });
  };

  this.get = (key, def = null) => {
    return this.promise.then(
      () => {
        if(!this.account || !this.account.options || !this.account.options[key]) return def;
        return this.account.options[key];
      },
      () => {
        return def;
      }
    );
  };

  this.getData = () => {
    return Account.findById({'id': LoopBackAuth.currentUserId})
    .$promise
    .then((data) => this.account = data);
  };
  
  this.load = () => {
    this.account = null;
    this.promise = this.getData();
  };
  
  this.load();
  
}
