var personMapController = function (
  resolvePersons,
  resolveQuery,
  resolveQueryModel,
  q,
  $scope,
  Shout,
  AccountOptions,
  SearchQuery,
  PersonService,
  PersonEditService,
  GeoLocation,
  $q,
  $timeout
)  {"ngInject";
  this.mapType = "marker";

  this.mean = (persons) => {
    let latitude = 0;
    let longitude = 0;
    let count = 0;
    persons.forEach((p) => {
      if(p.geocode) {
        latitude += p.geocode.latitude;
        longitude += p.geocode.longitude;
        count++;
      }
    });
    if(count !== 0) {
      return { latitude: latitude/count, longitude: longitude/count };
    } else {
      return { latitude: latitude, longitude: longitude };
    }
  };


  this.setPersons = (persons) => {
    this.persons = _.filter(persons, person => person && person.address && person.address.home && person.address.home.geocode && person.address.home.geocode.lat);
    this.allPersons = persons;
  };


  this.map = {zoom: 8 };
  this.map.center = this.mean(resolvePersons);
  this.setPersons(resolvePersons);

  console.log("filterd persons", this.persons);

  this.query = resolveQuery;
  this.queryModel = resolveQueryModel;

  this.open = (person) => {
    Shout.info(person.firstName + " " + person.lastName);
  };

  this.reload = (query) => {
    q.all(query)
      .then((resolved) => PersonService.getAllFilterd(resolved))
      .then((d) => {
        AccountOptions.set('person_list_query', SearchQuery.clean(this.queryModel));
        this.setPersons(d);
       //// this.persons = d;
       })
      .catch((err) => {
        Shout.vError(err);
        AccountOptions.set('person_list_query', []);
        return PersonService.getAllFilterd({}).then(d => this.setPersons(d));
      });
  };

  this.geoUpdated = 0;
  this.still = [];

  this.updateGeo = () => {
    this.still = _.cloneDeep(this.allPersons);
    this.updateGeoStep();
  };

  this.updateGeoStep = () => {
    if(this.still.length === 0) return;
    let person = _.head(this.still);
    this.still = _.tail(this.still);
    this.updateGeoPerson(person);
    $timeout(this.updateGeoStep, 110);
  };

  this.updateGeoPerson = (person) => {
    return GeoLocation.geocodeAddress(person.address.home).then((coords) => {
      console.log("coords", coords);
      person.address.home.geocode = coords;
      this.geoUpdated++;
      return PersonEditService.save(person);
    });
  };

  this.heatLayer = (heatLayer) => {
    var taxiData = [];
    this.persons.forEach((person) => {
      console.log(person.geocode);
      taxiData.push(new google.maps.LatLng(person.geocode.latitude, person.geocode.longitude));
    });
    console.log(taxiData);
    var pointArray = new google.maps.MVCArray(taxiData);
    heatLayer.setData(pointArray);
  };
  $scope.$watch(
    () => {
      return this.query;
    },
    (newValue) => {this.reload(newValue);}, true);

};

angular.module('mh.person').controller('PersonMapController', personMapController);
