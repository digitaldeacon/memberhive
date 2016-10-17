export function PersonExportPDFController(
  mhConfig,
  $window,
  $rootScope,
  q
) {"ngInject";
  this.query = {};
  this.url = mhConfig.apiUrl + '/Persons/exportPDF';

  this.getImages = () => {
   /*jshint camelcase: false */
    var params =
    {
      access_token: $rootScope.accessToken,
    };
    q.all(this.query).then((resolved) => {
      params.filter = resolved;
      $window.open(mhConfig.apiUrl+'/Persons/exportPDF?'+jQuery.param(params), "_blank");
    });
  };

}
