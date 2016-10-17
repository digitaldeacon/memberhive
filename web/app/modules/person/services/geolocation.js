var geoLocationService = function(
    $q,
    $http)
{"ngInject";

  this.geocodeAddress = (address) => {
    var adr = "";
    if(address.street1)
      adr += address.street1;
    if(address.zipcode)
      adr += ", " + address.zipcode;
    if(address.city)
      adr += " " + address.city;
    if(address.country) {
      adr += ", "+ address.country;
    }
    return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+adr)
      .then((gdata)=>{
          console.log(gdata);
          if(gdata.data.results.length > 0) {
            console.log("save", gdata.data.results[0].geometry.location);
            return gdata.data.results[0].geometry.location;
          } else {
            return {};
          }
      });
  };

  this.geocodePerson = (person) => {
    return person;
  };

};
angular.module('mh.person').service('GeoLocation', geoLocationService);

