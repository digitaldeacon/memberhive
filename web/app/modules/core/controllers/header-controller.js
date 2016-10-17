export function HeaderController(
  $scope,
  $state,
  Search,
  gettext,
  LoopBackAuth,
  $mdMedia,
  Account,
  AvatarService,
  MhAcl
)
{
  "ngInject";

  this.searchText = '';
  this.selectedItem = null;
  
  this.personalMenu = [
    {name: gettext('Profile'), icon: 'person', link: 'person.view({id: "'+LoopBackAuth.currentUserId+'"})'},
  ];

  this.querySearch = (query) => {
    return Search.search(query).$promise.then((data) => {
      return data.data;
    });
  };

  this.selectedItemChange = (item) =>  {
    if(!item) return;
    var id = this.selectedItem.id;
    this.selectedItem = null;
    this.searchText = '';
    $state.go('person.view', {id: id});

  };

  this.logout = () => {
    Account.logout().$promise.then(() => {
      MhAcl.setRights([]);
      $state.go('login');
    });
  };

  this.avatarUrl = (person) => {
    return AvatarService.getAvatarUrl(person, 'xs');
  };
}
