export class ReportHtmlController {

  constructor(selectedReport, $sce, mhConfig) {
    this.htmlPreviewURL = $sce.trustAsResourceUrl(`${mhConfig.apiUrl}/Reports/renderHTML?reportId=${selectedReport.id}`);
  }
}

export class ReportHtmlEditController {

  constructor(Report) {
    this.reports = Report.find();
    this.report = null;
  }
}
