var mhConfigValues = function (
  Settings
) {"ngInject";

  this.get = (section, key, def = null) => {
    return Settings.findOne({where: {name: section}}).$promise
    .then(
      (data) => {
        if(!data.value[key]) return def;
        return data.value[key];
      },
      () => {
        return def;
      }
     );
  };

  this.getAll = (section, def = null) => {
    return Settings.findOne({where: {name: section}}).$promise
    .then(
      (data) => {
        return data.value;
      },
      () => {
        return def;
      }
     );
  };

  this.set = (section, key, value) => {
    this.getAll(section, {name: section, value: {}}).then((object) => {
      object.value[key] = value;
      Settings.upsert({}, object);
    });
  };

  this.setAll = (section, value) => {
    this.getAll(section, {name: section, value: {}}).then((object) => {
      console.log(object);
      object.name = section;
      object.value = value;
      Settings.upsert({}, object);
    });
  };

};

angular.module('mh.settings').service('MhConfigValues', mhConfigValues);
