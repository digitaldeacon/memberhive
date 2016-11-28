export function PersonEditService(
  $q,
  PersonService,
  Person
) {"ngInject";
  this.person = undefined;
  this.account = undefined;


  /*
   * Load Person by person_id.
   * Cached
   */
  this.getPerson = (personId) => {
    return PersonService.one(personId)
      .then((p) => this.person = p);//cache person
  };

  this.save = (person) => {
    return Person.upsert({filter: {include: ['household', 'groups']}}, PersonService.undoMap(person))
      .$promise.then((d) => {return PersonService.mapPerson(d);});
  };

  this.delete = (person) => {
    return Person.deleteById({id: person.id}).$promise;
  };

  this.createAccount = (person, username, password) => {
    return Person.account.create(
      {id: person.id},
      {
        username: username,
        email: person.emails.personal,
        password: password || person.lastName
      }
    ).$promise;
  };


  this.transformBack = (person) => {
    //remove all time information because it is a date
    person.dates = _.mapValues(person.dates, (d) => {
      return d;
      /*console.log("pre to string", d);
      if(d instanceof Date) {
        if(isNaN(d)) return "";
        console.log("is date");
        console.log(moment.utc(d).zone(0));
        console.log(moment(d).zone(0));
        console.log(moment(d).zone(0).toISOString());
        console.log(moment.utc(d).zone(0).toISOString());
        d = moment.utc(d).toISOString();
      }
      var split = d.split("T");
      console.log("after split", split[0]);
      return split[0]+"T00:00:00.000Z";*/
    });
    return person;
  };
  /*
   * Creates a relation between to item of twio different models.
   * @param {object} item - The main model. It should have an key named 'id'.
   * @param {array} values - The models which will be linked against the main model.
   * @param {array} ids - A List with ids of models wich are already linked to this model.
   * @param {object} relation - Loopback object which can create the relation
   * @param {object} singleton - Loopback object, which can modify the main model.
   * @example
   *  return PersonEditService.assign(data, this.person.household, this.person.householdIds, Person.household, Household);
   * @example
   * return PersonEditService.assign(data, this.person.groups, this.person.groupIds, Person.groups, Group);
   * @returns {object} The item again.
   */
  this.assign = (item, values, ids, relation, singleton) => {
    //var promises = [];
    var used = [];
    var promise = $q.when(item);
    values.forEach((value) => {
      if(value.id) {//already a existing group
        if(!_.includes(ids, value.id)) { //not already linked to this person
          promise = promise.then(() => {return relation.link({id: item.id, fk: value.id}).$promise;});
        }
        used.push(value.id);
      } else {//create and link to it
        //TODO: if there is a singleton with the same name, then use it. See Bug #80
        promise = promise.then(() => {
            return singleton.create({}, value).$promise.then((newValue) => {//create group
              return relation.link({id: item.id, fk: newValue.id}).$promise; //link to person
            }).$promise;
        });
      }
    });

    _.difference(ids, used).forEach((id) => {
      promise = promise.then(() => {return relation.unlink({id: item.id, fk: id}).$promise;});
    });
    return promise.then(() => {return item;});
  };
}
