export function Search(
  Person, 
  Group, 
  $q,
  Household,
  Note,
  Event,
  EventTemplate
) {"ngInject";
  this.search = (query) => {
    return Person.search({query: query});
  };

  this.newSearch = (query, which) => {
    which = which || ['person', 'group'];
    let promises = [];
    if(_.includes(which, 'person')) {
      promises.push(this.personSeach(query));
    }
    if(_.includes(which, 'group')) {
      promises.push(this.groupSeach(query));
    }
    return $q.all(promises);
  };

  this.personSearch = (query) => {
    return Person.search({query: query}).$promise
      .then((data) => data.map(this.genPerson));
  };

  this.genPerson = (data) => {
    return {
      icon: "",
      name: data.firstName + " " + data.lastName,
      viewAction: "",
      id: data.id,
      type: "person"
    };
  };

  this.genGroup = (data) => {
    return {
      icon: "",
      name: data.name,
      viewAction: "",
      id: data.id,
      type: "person"
    };
  };


  this.groupSearch = (query) => {
    return Group.find({
        filter: {
          where: {name: {like: query}}
        }
      }).$promise
      .then((data) => data.map(this.genGroup));
  };
  
  this.searchValue = (modelName, field, query) => {
    let model = null;
    switch(modelName) {
      case "Person":
        model = Person;
        break;
      case "Group":
        model = Group;
        break;
      case "Note":
        model = Note;
        break;
      case "Household":
        model = Household;
        break;
      case "Event":
        model = Event;
        break;
      case "EventTemplate":
        model = EventTemplate;
        break;
      default:
        console.error("not definied in Search::searchValue", modelName);
    }
    return model.searchValue({field: field, text: query}).$promise
      .then((ret) => ret.data);
  };
}
