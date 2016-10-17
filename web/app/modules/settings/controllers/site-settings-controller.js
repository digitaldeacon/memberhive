var siteSettingsController = function (
  MhConfigValues,
  resolveMailchimp
) {"ngInject";
  this.values = {
    mailchimp: resolveMailchimp
  };
  
  this.update = (section) => {
    console.log("update", section, this.values[section]);
    if(this.values[section]) {
      MhConfigValues.setAll(section, this.values[section]);
    }
  };
};

angular.module('mh.settings').controller('SiteSettingsController', siteSettingsController);


