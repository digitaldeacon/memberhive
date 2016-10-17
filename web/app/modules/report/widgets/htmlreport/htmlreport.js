export var ReportHtmlWidget = angular.module('gem.report.widget.htmlreport', []);

/*
import {ReportHtmlController, ReportHtmlEditController} from './htmlreport-controller';
ReportHtmlWidget.config((dashboardProvider, gettext) => {
  dashboardProvider.widget('report.htmlreport', {
    title: gettext('Show Report'),
    description: gettext('Display a single report'),
    templateUrl: '/app/modules/report/widgets/htmlreport/view.html',
    edit: {
      templateUrl: '/app/modules/report/widgets/htmlreport/edit.html',
      controller: 'ReportHtmlEditController as reportHtmlEditCtrl'
    },
    controller: 'ReportHtmlController as reportHtmlCtrl',
    resolve: {
      selectedReport: function(Report, config) {
        if (config.selectedReport)
          return Report.findById({id: config.selectedReport.id}).$promise;
        return null;
      }
    }
  });
});

ReportHtmlWidget.controller('ReportHtmlController', ReportHtmlController);
ReportHtmlWidget.controller('ReportHtmlEditController', ReportHtmlEditController);
*/
