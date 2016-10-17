export function HouseholdListController (
  resolveHouseholds,
  Household,
  Shout,
  PersonService
) {
    "ngInject";
  this.households = resolveHouseholds;

  this.deleteHousehold = (household) => {
    Household.deleteById({id: household.id}).$promise.then(() => {
      Shout.success("Household deleted");
      PersonService.getHouseholds().then((d) =>  this.households = d);
    });
  };
}
