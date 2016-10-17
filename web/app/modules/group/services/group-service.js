export function GroupService(
  Group
) {"ngInject";
  
  this.mapGroup = (group) => {
    group.icon = 'group';
    return group;
  };
  
  this.mapGroups = (groups) => _.map(groups, this.mapGroup);
  this.all = () => {
    return Group.find({filter: {order: ['name ASC']}}).$promise.then(this.mapGroup);
  };
  
  this.new = () => {
    return new Group();
  };
  
  this.get = (groupId) => {
    return Group.findById({id: groupId}).$promise.then(this.mapGroup);
  };
  
  this.save = (group) => {
    return Group.upsert({}, group).$promise.then(this.mapGroup);
  };
  
  this.search = (query) => {
    return Group.find({
        filter: {
          where: {name: {like: query}}
        }
      }).$promise
      .then(this.mapGroups);
  };
}
