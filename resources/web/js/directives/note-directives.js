/**
 * Directive to show and edit a note
 *
 * Minimal Usage:
 *   <note-editform />
 */
export function NoteEditFormDirective() {"ngInject";
  return {
    scope: {
        note: '='
    },
    restrict: 'E',
    templateUrl: 'app/modules/note/templates/note-edit-form-directive.html'
  };
}


export function NoteCreateDirective() {"ngInject";
  return {
    scope: {
        notableId: '@',
        notableType: '@',
        buttonClass: '@',
        newNote: '&'
    },
    controller: function ($scope, $element, $mdDialog, Note, NoteIconConfig, Shout, gettextCatalog)  {"ngInject";
      this.type = 'note';
      this.noteTypes = NoteIconConfig;

      this.create = (controller) => {
        Note.upsert(
          {
            title: controller.title,
            content: controller.content,
            type: controller.type,
            notableId: $scope.notableId,
            notableType: $scope.notableType
          }).$promise
        .then(
          (data) => {
            Shout.message(gettextCatalog.getString('Note created'));
            $scope.newNote({note:data});
          }
        );
        this.clear();
      };

      this.clear = () => {
        this.title = '';
        this.content = '';
        this.noteType = '';
      };

      this.createDialog = (event) => {
        $mdDialog.show({
          controller: this.DialogController,
          controllerAs: 'ctrl',
          bindToController: true,
          templateUrl: 'app/modules/note/templates/note-dialog.html',
          parent: angular.element(document.body),
          targetEvent: event,
          locals: {
            noteTypes: this.noteTypes,
            type: this.type,
            title: this.title,
            content: this.content,
            vm: this
          },
        });
      };

      this.DialogController = ($scope, $mdDialog) => {"ngInject";
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.create = function() {
          this.ctrl.vm.create(this.ctrl);
          $mdDialog.hide();
        };
      };
    },
    controllerAs: 'ctrl',
    restrict: 'E',
    templateUrl: 'app/modules/note/templates/note-create-directive.html'
  };
}

export function NoteCreateInlineDirective() {"ngInject";
  return {
    scope: {
        notableId: '@',
        notableType: '@',
        buttonClass: '@',
        newNote: '&'
    },
    controller: function ($scope, NoteService, NoteIconConfig, Shout, gettextCatalog)  {"ngInject";
      this.type = 'note';
      this.noteTypes = NoteIconConfig;

      this.create = () => {
        NoteService.save(
          {
            title: this.title,
            content: this.content,
            type: this.type,
            notableId: $scope.notableId,
            notableType: $scope.notableType
          })
        .then(
          (data) => {
            Shout.message(gettextCatalog.getString('Note created'));
            $scope.newNote({note:data});
          }
        );
        this.clear();
      };

      this.clear = () => {
        this.title = '';
        this.content = '';
        this.type = '';
      };
    },
    controllerAs: 'ctrl',
    restrict: 'E',
    templateUrl: 'app/modules/note/templates/note-inline.html'
  };
}



