import {AppController} from './controllers/app-controller';
import {HeaderController} from './controllers/header-controller';
import {SidebarController} from './controllers/sidebar-controller';
import {ShoutController} from './controllers/shout-controller';

import {MainMenu} from './providers/menu-provider';

import {mhMenuItem, mhMenuIconItem} from './directives/nav-directive';
import {stateLoader, appLoader} from './directives/loading-directive';
import {mhSearchBox, mhSearchChips} from './directives/search-directives';
import {utcDate, mhDateInput, mhUtcDateInput} from './directives/date-directives';
import {mhTags} from './directives/tags';


import {Shout} from './services/shout';
import {AccountOptions} from './services/account-options';
import {mhFileReader} from './services/filereader';
import {Search} from './services/search';
import {SearchQuery} from './services/search-query';
import {q} from './services/q';
import {fromNowFilter,fromNowMomentFilter} from './filters/date-filters';
import {isEmpty} from './filters/utils';


var mhCoreModule = angular.module('mh.core');

mhCoreModule.config(() => { "ngInject";
  
  // Codemirror: Create html/handlebars mixed mode
  // https://github.com/codemirror/CodeMirror/blob/master/mode/handlebars/index.html#L64
  /*CodeMirror.defineMode("htmlhandlebars", function(config) {
    return CodeMirror.multiplexingMode(
      CodeMirror.getMode(config, "text/html"), {
        open: "{{", close: "}}",
        mode: CodeMirror.getMode(config, "handlebars"),
        parseDelimiters: true
      }
    );
  });*/
});

// Controllers
mhCoreModule.controller('AppController', AppController);
mhCoreModule.controller('HeaderController', HeaderController);
mhCoreModule.controller('SidebarController', SidebarController);
mhCoreModule.controller('ShoutController', ShoutController);

// Providers
mhCoreModule.provider('MainMenu', MainMenu);

// Services
mhCoreModule.service('Search', Search);
mhCoreModule.service('SearchQuery', SearchQuery);
mhCoreModule.service('q', q);
mhCoreModule.service('AccountOptions', AccountOptions);

// Factories
mhCoreModule.factory('Shout', Shout);
mhCoreModule.factory('mhFileReader', mhFileReader);

// Directives
mhCoreModule.directive('mhMenuItem', mhMenuItem);
mhCoreModule.directive('mhMenuIconItem', mhMenuIconItem);
// Search Directives
mhCoreModule.directive('mhSearchChips', mhSearchChips);
mhCoreModule.directive('mhSearchBox', mhSearchBox);

mhCoreModule.directive('mhStateLoader', stateLoader);
mhCoreModule.directive('mhAppLoader', appLoader);
// Date Directives
mhCoreModule.directive('utcDate', utcDate);
mhCoreModule.directive('mhUtcDateInput', mhUtcDateInput);
mhCoreModule.directive('mhDateInput', mhDateInput);
mhCoreModule.directive('mhTags', mhTags);

// Filters
mhCoreModule.filter('fromNow', fromNowFilter);
mhCoreModule.filter('fromNowMoment', fromNowMomentFilter);
mhCoreModule.filter('isEmpty', isEmpty);
