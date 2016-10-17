export function GroupViewController(
  GroupService,
  resolveGroup,
  resolvePersons,
  Group,
  Person,
  Shout
) {"ngInject";
  this.group = resolveGroup;
  this.persons = resolvePersons;

  this.deletePerson = (person) => {
    Person.groups.unlink({id: person.id, fk: this.group.id}).$promise
      .then(() => {
        Shout.success(person.firstName + " deleted");
        this.persons = Group.persons({id: this.group.id}).$promise;
      });
  };

  this.isLeader = (person) => {
    return this.group.status && this.group.status[person.id] === "leader";
  };

  this.makeLeader = (person) => {
    if(!this.group.status)
      this.group.status = {};
    this.group.status[person.id] = "leader";
    Group.upsert({},this.group);
  };

  this.unMakeLeader = (person) => {
    this.group.status[person.id] = "";
    Group.upsert({},this.group);
  };

}
