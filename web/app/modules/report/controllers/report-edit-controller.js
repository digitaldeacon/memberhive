export function ReportEditController(
  $scope,
  resolveReport,
  Report, 
  ReportService,
  Person, 
  gettextCatalog, 
  Shout, 
  $stateParams, 
  QueryBuilderModelService,
  mhConfig, 
  $sce, 
  $document
 ){"ngInject";

  this.report = resolveReport;
  this.htmlPreviewURL = $sce.trustAsResourceUrl(mhConfig.apiUrl+"/Reports/renderHTML?reportId=" + this.report.id);
  this.pdfPreviewURL = $sce.trustAsResourceUrl(mhConfig.apiUrl+"/Reports/renderPDF?reportId=" + this.report.id);

  $scope.reportHtml = '';

  this.editorOptions = {
    lineNumbers: true,
    lineWrapping: true,
    mode: 'htmlhandlebars'
  };

  this.dataSources = {};
  //this.dataSources.persons = QueryBuilderModelService.getModel(this.Person);

  this.saveReport = () => {
    this.report.name = $scope.reportUpCtrl.report.name;
    this.report.html = $scope.reportUpCtrl.report.html;
    ReportService.save(this.report)
      .then(this.reloadPreview());
  };
  
  this.reloadPreview = () => {
    var iFrame = $document.find("#htmlPreviewFrame");
    iFrame.attr("src", iFrame.attr("src"));
    iFrame = $document.find("#pdfPreviewFrame");
    iFrame.attr("src", iFrame.attr("src"));
  };
  
  this.setBuilderFilters = () => {
    return this.dataSources.persons;
  };

}
