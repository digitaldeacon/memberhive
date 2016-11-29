export function AppController(
  $scope,
  $rootScope,
  gettextCatalog,
  PersonService,
  $state,
  productName,
  $mdSidenav,
  $mdUtil,
  $timeout,
  mhConfig
)
{
 "ngInject";
  /**
   * Get the title of the current page
   *
   * @todo Translate the page title (Can't be done in the config phase when the pageTitles are created)
   *
   * @returns {string} The formatted title
   */
  this.getTitle = () => {
    if ($state.current.hasOwnProperty('data'))
      return `${$state.current.data.pageTitle} | ${productName}`;
    return productName;
  };
  this.getSubTitle = () => {
    if ($state.current.hasOwnProperty('data'))
      return $state.current.data.pageSubTitle;
    return "";
  };

  function buildToggler(navID) {
    var debounceFn =
    $mdUtil.debounce(
      function(){
        $mdSidenav(navID).toggle();
      },
      300
    );

    return debounceFn;
  }

  this.toggleLeft = buildToggler('left');

  this.openMenu = () => {
    $mdSidenav('left').open();
  };
  this.closeMenu = () => {
    $mdSidenav('left').close();
  };
  
  this.getCommitSHA = () => {
    return mhConfig.commitSHA;
  };
  
  this.getCommitMsg = () => {
    return mhConfig.commitMsg;
  };
}
