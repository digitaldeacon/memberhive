export class ReportListController {

  constructor(ReportService, Report, Shout, gettextCatalog, $state) {"ngInject";
    this.ReportService = ReportService;
    this.Report = Report;
    this.Shout = Shout;
    this.gettextCatalog = gettextCatalog;
    this.$state = $state;

    this.reports = [];
    this.currentPage = 1;
    this.totalReports = 0;

    this.getReports();
  }

  pageChanged(pageNum) {
    this.getReports(pageNum);
  }

  getReports(pageNumber) {
    pageNumber = pageNumber || 1;

    this.Report.count().$promise.then((result) => {
      this.totalReports = result.count;
    });
    this.reports = this.ReportService.all(pageNumber);
  }

  duplicate(report) {
    this.Report.duplicate({reportId: report.id}).$promise.then((resp) => {
      this.Shout.message(this.gettextCatalog.getString('Successfully duplicated report.'));
      this.$state.go('report.edit', {id: resp.result.id});
    });
  }

  deleteReport(report) {
    this.ReportService.trash(report.id, this.getReports);
  }
}
