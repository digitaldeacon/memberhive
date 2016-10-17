import {EventController} from './controllers/event-controller';
import {EventsController} from './controllers/events-controller';
import {EventTemplatesController} from './controllers/event-templates-controller';
import {EventTemplateController} from './controllers/event-template-controller';
import {EventTemplateScheduleController} from './controllers/event-template-schedule-controller';
import {EventTemplateViewController} from './controllers/event-template-view-controller';
import {EventService} from './service/event-service';
import {EventTemplateService} from './service/event-template-service';

import './widgets/next-events/next-events';


var mhEventModule = angular.module('mh.event').config(
  ($stateProvider) => {
    $stateProvider.state('event', {
      url: '/event',
      data: {
       // pageTitle: gettextCatalog.getString('Calendar'),
        component: 'calendar'
      },
      abstract: true,
      template: '<ui-view/>'
    }).state('event.list', {
      url: '/list',
      controller: 'EventsController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/events.html',
      data: {
      //  pageSubTitle: gettextCatalog.getString('All Events')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveEvents: (EventService) => {
          return EventService.all();
        },
        resolveTemplates: (EventTemplateService) => {
          return EventTemplateService.all();
        },
        resolveNextEvents: (resolveEvents) => {
          return _.take(_.filter(resolveEvents, (event) => event.date > new Date()), 10);
        }
      },
    }).state('event.edit', {
      url: '/view/:eventId',
      controller: 'EventController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.html',
      data: {
       // pageSubTitle: gettextCatalog.getString('Event')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveEvent: (EventService, $stateParams) => {
          return EventService.get($stateParams.eventId);
        },
        resolveTemplate: (Event, $stateParams) => {
          return Event.template({id: $stateParams.eventId}).$promise;
        },
        resolveTemplates: (EventTemplate) => {
          return EventTemplate.find().$promise;
        }
      }
    })
    .state('event.create', {
      url: '/create',
      controller: 'EventController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.html',
      data: {
        //pageSubTitle: gettextCatalog.getString('Create Event')
      },
      params: {
        date: null,
        templateId: null
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve : {
        resolveEvent: (EventService, $stateParams) => {
          return EventService.new($stateParams.date);
        },
        resolveTemplates: (EventTemplateService) => {
          return EventTemplateService.all();
        },
        resolveTemplate : ($stateParams, EventTemplateService) => {
          if($stateParams.templateId !== null) {
            return EventTemplateService.get($stateParams.templateId);
          }
          return EventTemplateService.new();
        }
      }
    })
    .state('event.templates', {
      url: '/templates/list',
      controller: 'EventTemplatesController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.templates.html',
      data: {
       // pageSubTitle: gettextCatalog.getString('Event Templates')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('event.template', {
      url: '/template/edit/:templateId',
      controller: 'EventTemplateController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.template.html',
      data: {
        //pageSubTitle: gettextCatalog.getString('Create Event Template')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveTemplate: (EventTemplateService, $stateParams) => {
          if($stateParams.templateId) {
            return EventTemplateService.get($stateParams.templateId);
          } else {
            return {
              name: "New Event Template",
              data: [{name: "New Name", type: "text"}]
            };
          }
        }
      }
    }).state('event.newSchedule', {
      url: '/template/schedule/new/:templateId',
      controller: 'EventTemplateScheduleController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.template.schedule.html',
      data: {
       // pageSubTitle: gettextCatalog.getString('Schedule')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveTemplate: (EventTemplateService, $stateParams) => {
          return EventTemplateService.get($stateParams.templateId)  ;
        },
        resolveSchedule: () => {
          return {name: "New Schedule", data: {0: {name: "First Point", type: "text"}}};
        }
      }
    }).state('event.editSchedule', {
      url: '/template/schedule/edit/:templateId/:index',
      controller: 'EventTemplateScheduleController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.template.schedule.html',
      data: {
       // pageSubTitle: gettextCatalog.getString('Schedule')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveTemplate: (EventTemplateService, $stateParams) => {
          return EventTemplateService.get($stateParams.templateId);
        },
        resolveSchedule: (resolveTemplate, $stateParams) => {
          return resolveTemplate.schedules[$stateParams.index];
        }
      }
    }).state('event.viewTemplate', {
      url: '/template/view/:templateId',
      controller: 'EventTemplateViewController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.template.view.html',
      data: {
        //pageSubTitle: gettextCatalog.getString('View Event Template')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve : {
        resolveTemplate: (EventTemplateService, $stateParams) => {
          return EventTemplateService.get($stateParams.templateId);
        },
        resolveEvents : (EventService, $stateParams) => {
          return EventService.eventsByTemplate($stateParams.templateId);
        }
      }
    });
  }
);

mhEventModule.controller('EventController', EventController);
mhEventModule.controller('EventsController', EventsController);
mhEventModule.controller('EventTemplatesController', EventTemplatesController);
mhEventModule.controller('EventTemplateController', EventTemplateController);
mhEventModule.controller('EventTemplateScheduleController', EventTemplateScheduleController);
mhEventModule.controller('EventTemplateViewController', EventTemplateViewController);
mhEventModule.service('EventService', EventService);
mhEventModule.service('EventTemplateService', EventTemplateService);

mhEventModule.constant('EventStatusOptions', {
    done : {icon: "done", color: "#87EC13"},
    open : {icon: "help", color: "#0066A5"},
    warning: {icon: "warning", color: "#E88F22"},
    error: {icon: "error", color: "#FF0000"},

  });
mhEventModule.constant('EventTemplateOptions', [
    {name: "Text", value: "text"},
    {name: "Date", value: "date"},
    {name: "Person", value: "person"},
    {name: "Groups", value: "group"}
  ]);
