var mhWidgetLastNotes = function () {
  return {
    templateUrl: 'app/modules/note/widgets/last-notes/view.html',
    restrict: 'E',
    controller: ($scope, NoteService) => {"ngInject";
      NoteService.all({limit: 10}).then(d => $scope.notes = d);
    },
  };
};

angular.module('mh.note').directive('mhWidgetLastNotes', mhWidgetLastNotes);
