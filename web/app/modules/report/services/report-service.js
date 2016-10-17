export function ReportService(Report, gettextCatalog, $rootScope, Shout) {"ngInject";
  return {
    one: (id) => {
      return Report.findById({id: id});
    },

    all: (pageNumber) => {
      return Report.find({
        filter: {
          limit: $rootScope.gemConfig.pagination.pageSize,
          offset: (pageNumber - 1) * $rootScope.gemConfig.pagination.pageSize
        }
      });
    },

    trash: (reportId, cb) => {
      Report.trash({id: reportId}).$promise.then(cb);
    },

    save: (reportObj) => {
      var p = Report.upsert({},reportObj).$promise;
      p.then(
        () => {
          Shout.message(gettextCatalog.getString('Report saved.'));
        },
        (error) => {
          Shout.vError(error);
        }
      );
      return p;
    }
  };
}
