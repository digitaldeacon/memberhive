export function PersonExportPDFController(
  Person,
  AccountOptions,
  mhConfig,
  $window,
  $http,
  $rootScope,
  q
) {"ngInject";

  this.query = {};

  this.url = mhConfig.apiUrl + '/Persons/exportPDF';

  this.options = AccountOptions.get('person-export-pdf-options',
    {
      cover: false,
    }
  );

  this.getPDF = () => {
    var url = location.protocol+"//"+location.hostname;
    if(location.port)
      url += ":"+location.port;
    url += "/standalone/pdf.css";

    var apiUrl;
    if(_.startsWith(mhConfig.apiUrl, '/')) {
      apiUrl = location.protocol+"//"+location.hostname;
      if(location.port) {
        apiUrl += ":"+location.port;
      }
      apiUrl += mhConfig.apiUrl;
    } else {
      apiUrl = mhConfig.apiUrl;
    }

   /*jshint camelcase: false */
    var params =
    {

      access_token: $rootScope.accessToken,
      css: url,
      apiBase: apiUrl,
      options: angular.toJson(this.options)
    };
    q.all(this.query).then((resolved) => {
      params.filter = resolved;
      $window.open(mhConfig.apiUrl+'/Persons/exportPDF?'+jQuery.param(params),"_blank");
      AccountOptions.set('person-export-pdf-options', this.options);
    });
  };

}
