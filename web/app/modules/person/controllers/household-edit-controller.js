export function HouseholdEditController (
  PersonService,
  Household,
  Person,
  Shout,
  gettextCatalog,
  $state,
  resolveHousehold,
  resolvePersons
) {"ngInject";
  this.household = resolveHousehold;
  this.persons = resolvePersons;

  this.save = () => {
    return Household.upsert({}, this.household).$promise;
  };

  this.saveAndClose = () => {
    this.save().then(() => {
      $state.go('person.households');
    });
  };

  this.saveAndNew = () => {
    this.save().then(() => {
      $state.go('person.household-create');
    });
  };

  this.unlink = (personId) => {
    var householdId = this.household.id;
    Person.household.unlink({fk: householdId, id: personId}).$promise
      .then(
        () => Household.persons({id: householdId}).$promise.then(d => this.persons = d),

        (err) => Shout.vError(err)
      );
  };
}
