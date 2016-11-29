export function SidebarController (
  Account,
  $state,
  $timeout,
  $mdSidenav,
  AccountOptions,
  gettext
)
{"ngInject";
  this.mainMenu =
  [
    {label: gettext('Dashboard'), icon: "dashboard", route: "dashboard"},
    {label: gettext('Persons'), icon: "person", route: "person.list"},
    {label: gettext('Calendar'), icon: "today", route: "event.list"},
    {label: gettext('Notes'), icon: "note_add", route: "note.list"},
    {label: gettext('Groups'), icon: "people_outline", route: "group.list"},
    {label: gettext('Settings'), icon: "settings", route: "settings.site"},
  ];

  this.closeMenu = () => {
    $mdSidenav('left').close();
  };

  this.openMenu = () => {
    $mdSidenav('left').open();
  };

  this.isMenuLocked = false;
  AccountOptions.get('sidebar_locked', false).then((data) => {
    this.isMenuLocked = data;
  });

  this.menuClass = () => {
    return 'admin-sidebar-collapsed';
  };


  this.toggleMenuLock = () => {
    this.isMenuLocked = !this.isMenuLocked;
    AccountOptions.set('sidebar_locked', this.isMenuLocked);
  };

  this.menuLockIcon = () => {
    return this.isMenuLocked ? 'unfold_less' : 'unfold_more';
  };


  this.selected = '';


}
