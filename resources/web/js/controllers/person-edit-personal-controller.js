export function PersonEditPersonalController (
  PersonService, 
  Person, 
  Household, 
  AddressService, 
  $stateParams, 
  $scope, 
  Shout,
  gettextCatalog
) 
{    "ngInject";

  this.selectedStatus = null;

  //this.getPerson().then((p) => this.person = p);

  this.relationTypes = PersonService.relationTypes;
  this.genders = PersonService.genders;
  this.households = PersonService.getHouseholds();
  this.addressTypes = AddressService.addressTypes;

  this.primaryContactTypes = ['none', 'email', 'mobile', 'letterHome', 'letterWork', 'letterPostal'];
  this.primaryContactTypesTranslated = {
    'none': gettextCatalog.getString('None (no contact)'),
    'email': gettextCatalog.getString('Email'),
    'mobile': gettextCatalog.getString('Mobile'),
    'letterHome': gettextCatalog.getString('Letter (Home Address)'),
    'letterWork': gettextCatalog.getString('Letter (Work Address)'),
    'letterPostal': gettextCatalog.getString('Letter (Postal Address)')
  };
  this.status = [];

  this.avatar = null;
  this.uploadedAvatar = null;
  this.croppedAvatar = null;
  this.avatarChanged = false;
  this.avatarDeleted = false;
  this.isEditingAvatar = false;

  this.datepickerBirthdateOpened = false;
  this.datepickerBaptismDateOpened = false;

  /// Whether a newly created household should be automatically assigned to the edited person
  this.assignNewHousehold = true;
  
  this.hasAccount = false;
  this.shouldHaveAccount = false;

 

  this.isEditing = () => {
    return this.$stateParams.id !== undefined;
  };

  this.getPerson = () => {
    this.Person.account({'id': this.$stateParams.id}).$promise.
      then(
        (data) => {
          if (data) {
            this.hasAccount = true;
            this.shouldHaveAccount = true;
            this.account = data;
          }
        }
      );
    return this.isEditing() ? this.PersonService.one(this.$stateParams.id) : new this.Person();
    
  };

  this.getTitle = () => {
    if (this.isEditing()) {
      return this.$filter('formatName')(this.person);
    } else {
      return this.gettextCatalog.getString('Create new Person');
    }
  };

  this.editAvatar = () => {
    this.isEditingAvatar = true;
  };

  this.removeAvatar = () => {
    this.person.hasAvatar = false;
    this.avatarDeleted = true;
  };

  this.cancelEditingAvatar = () =>  {
    this.isEditingAvatar = false;
  };

  this.addHousehold = (householdName) => {
    this.Household.create({name: householdName}).$promise.then((household) => {
      if (this.assignNewHousehold) {
        this.person.household = household;
      }
      this.households = this.PersonService.getHouseholds();
    });
  };

  this.hasValidAddress = () => {
    var address;
    var needsAddress = false;
    var addressType = '';
    if (this.person.primaryContact === 'letterHome') {
      needsAddress = true;
      addressType = 'home';
    }
    if (this.person.primaryContact === 'letterWork') {
      needsAddress = true;
      addressType = 'work';
    }
    if (this.person.primaryContact === 'letterPostal') {
      needsAddress = true;
      addressType = 'postal';
    }
    if (!needsAddress) // No address required
      return true;

    if (!this.person.address) // Address needed, but no address found at all
      return false;

    address = this.person.address[addressType];

    // Validate address: Require at least street and city
    return address && address.street1 && address.city;
  };

  

  /**
   * Save all person data
   *
   * @todo When creating a new person, we should redirect to the person/view screen afterwards
   */
  this.save = (isValid=true,onward='') => {
    if (!isValid)
      return;

    this.person.hasAvatar = this.person.hasAvatar || this.avatarChanged;

    this.geoCodeAddress();

    this.Person.upsert({}, this.person).$promise.then(
      (data) => {
        var householdId = this.person.household ? this.person.household.id : "";
        if(this.shouldHaveAccount && !this.hasAccount) {
          this.Person.account.create({id: data.id}, {"username": data.firstName + "_"+data.lastName, "email": data.email, "password": data.lastName});
        }
        this.Person.setHousehold({id: this.person.id, householdId: householdId});
        if (this.avatarDeleted && !this.avatarChanged) {
          this.PersonService.deleteAvatar(this.person);
        } else if (this.avatarChanged) {
          this.AvatarService.saveAvatarFromDataURI(this.person.id, this.croppedAvatar);
        }
        this.Shout.message(
          this.gettextCatalog.getString('Successfully saved "{{fullname}}"', {fullname: this.$filter('formatName')(this.person)}));
        
        if(onward !== '') {
          this.$state.go(onward);
        }
      },
      (err) => {
        this.Shout.vError(err);
      }
    );
  };

  this.saveAndClose = () => {
    this.save(true,'person.list');
  };

  this.saveAndNew = () => {
    this.save(true,'person.create');
  };

}
