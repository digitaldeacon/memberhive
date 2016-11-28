export function PersonViewController(
  PersonService, 
  AddressService, 
  $stateParams, 
  Person, 
  resolvePerson,
  resolveNotes,
  NoteIconConfig,
  $state,
  Shout,
  Note
) {"ngInject";
  this.person = resolvePerson;
  this.notes = resolveNotes;
  this.getContacts = PersonService.getContacts;
  this.relationTypes = PersonService.relationTypes;
  this.genders = PersonService.genders;
  this.addressTypes = AddressService.addressTypes;
  
  this.showAddNote = false;
  
  this.isOpen = false;
  


  
  this.toggleNote = () => this.showAddNote = !this.showAddNote;
  
  this.newNote = (note) => {
    this.notes.unshift(note);
    this.showAddNote = false;
  };
  
  
  this.deleteNote = (note) => {
    Note.deleteById({id: note.id}).$promise.then(
      () => {
        Shout.success("Note deleted");
        Person.notes({"id": $stateParams.id}).$promise.then(data => this.notes = data);
      }, 
      (err) => Shout.vError(err)
    );
  };

  this.icon = (noteType) => {
    var icon = 'chat';
    NoteIconConfig.forEach((type) => {
      if(type.value === noteType) icon = type.icon;
    });
    return icon;
  };

  this.badgeClass = (noteType) => {
    var bclass = 'info';
    NoteIconConfig.forEach((type) => {
      if(type.value === noteType) bclass = type.class;
    });
    return bclass;
  };

  this.isDefaultAddress = (address) =>  {
    return address.type === 'home';
  };
  
  this.goPreviousPerson = () => {
    PersonService.getCachedAll().then((persons) => {
      var index = _.findIndex(persons, p => p.id === this.person.id);
      index--;
      if(persons[index]) {
        $state.go('person.view', {id: persons[index].id});
      }
    });
  };

  this.goNextPerson = () => {
     PersonService.getCachedAll().then((persons) => {
      var index = _.findIndex(persons, p => p.id === this.person.id);
      index++;
      if(persons[index]) {
        $state.go('person.view', {id: persons[index].id});
      }
    });
  };
  

}
