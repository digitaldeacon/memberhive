export function GroupListController(
  GroupService,
  resolveGroups,
  Shout,
  Group
) {"ngInject";
  this.groups = resolveGroups;

  this.deleteGroup = (group) => {
    Group.deleteById({id: group.id}).$promise.then(() => {
      Shout.success("Group deleted");
      GroupService.all().then(d => this.groups = d);
    });
  };
}
