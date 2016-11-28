var personExportController = function (resolveQueryModel) {"ngInject";
  this.queryModel = resolveQueryModel;
};
angular.module('mh.person').controller('PersonExportController', personExportController);
