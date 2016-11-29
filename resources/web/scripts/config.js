export var mhConfigModule = angular.module('mh.config', [])

.constant('productName', 'MemberHive')

.constant('mhConfig', configGlobal) // jshint ignore:line

.constant('NoteIconConfig', [{
      icon: 'chat',
      class: 'warning',
      title: 'Note',
      value: 'note'
    },{
      icon: 'email',
      class: 'info',
      title: 'Email',
      value: 'email'
    },{
      icon: 'call',
      class: 'info',
      title: 'Phone',
      value: 'phone'
    },{
      icon: 'group',
      class: 'warning',
      title: 'Meeting',
      value: 'meeting'
    },{
      icon: 'backup',
      class: 'warning',
      title: 'Prayer',
      value: 'prayer'
    },
    ])
.constant('AvatarSizes', ['xs','s','m','l'])

;
