import {NoteEditFormDirective, NoteCreateDirective, NoteCreateInlineDirective} from './directives/note-directives';
import {NoteService} from './services/note-service';
import {NoteListController} from './controllers/note-list-controller';
import {NoteEditController} from './controllers/note-edit-controller';

import './widgets/last-notes/last-notes';

var mhNoteModule = angular.module('mh.note').config(
  ($stateProvider) => {
    $stateProvider.state('note', {
      url: '/note',
      template: '<ui-view/>',
      abstract: true,
      data: {
        module: 'note',
       // pageTitle: gettextCatalog.getString('Notes')
      }
    }).state('note.list', {
      url: '/list',
      templateUrl: 'app/modules/note/views/note.list.html',
      controller: 'NoteListController',
      controllerAs: 'noteCtrl',
      data: {
       // pageSubTitle: gettextCatalog.getString('Create and edit notes')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveNotes: (NoteService) => {
          return NoteService.all();
        }
      }
    }).state('note.create', {
      url: '/create',
      templateUrl: 'app/modules/note/views/note.edit.html',
      controller: 'NoteEditController',
      controllerAs: 'noteCtrl',
      data: {
        //pageSubTitle: gettextCatalog.getString('Create a note')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveNote: (NoteService) => {
          return NoteService.new();
        }
      }
    }).state('note.edit', {
      url: '/edit/:id',
      controller: 'NoteEditController',
      controllerAs: 'noteCtrl',
      templateUrl: 'app/modules/note/views/note.edit.html',
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveNote: (NoteService, $stateParams) => {
          return NoteService.get($stateParams.id);
        }
      }
    });
  }
);
mhNoteModule.controller('NoteListController', NoteListController);
mhNoteModule.controller('NoteEditController', NoteEditController);
mhNoteModule.service('NoteService', NoteService);
mhNoteModule.directive('mhNoteEditForm', NoteEditFormDirective);
mhNoteModule.directive('mhNoteCreate', NoteCreateDirective);
mhNoteModule.directive('mhNoteCreateInline', NoteCreateInlineDirective);
