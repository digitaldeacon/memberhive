export function GroupEditController(
  GroupService, 
  resolveGroup,
  Shout,
  $state
) {"ngInject";
  this.group = resolveGroup;

  this.save = () => {
    return GroupService.save(this.group)
      .then(() => Shout.success("Group saved"),
            (err) => Shout.vError(err));
  };
  
  this.saveAndClose = () => {
    this.save().then(() => $state.go('group.list'));
  };
  
}
