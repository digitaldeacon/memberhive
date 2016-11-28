/**
 * Directive to show a person's avatar.
 *
 * Minimal Usage:
 *   <mh-avatar person="personCtrl.person" size="m"></mh-avatar>
 *
 * `size` can be anything from ['xs', 's', 'm', 'l'].
 * `person` must be a Loopback `Person` object.
 *
 * Optionally, you can also provide the `circle` attribute to have a circle avatar.
 * You might also apply any css classes:
 *   <mh-avatar person="personCtrl.person" size="m" circle class="foo bar"></mh-avatar>
 */
export function mhAvatar(AvatarService) {"ngInject";
  return {
    template: '<img ng-src="{{::imgSrc}}" class="{{::cssClasses}} {{::imgClass}}"' +
              ' aria-label="{{::label}}" tooltip="{{::label}}" height="{{::height}}" width="{{::width}}" />',
    restrict: 'E',
    scope: {
      person: '=',
      size: '@',
      cssClasses: '@class',
      label: '@'
    },

    link: function(scope, element, attrs) {
      scope.size = scope.size || 'xs';
      scope.imgClass = '';
      if (attrs.circle !== undefined)
        scope.imgClass = 'img-circle';

      var setImgSrc = (person, size) => {
        var thumbSizes = {
          'xs': 50,
          's':  150,
          'm':  400,
          'l': 800
        };
        scope.height = thumbSizes[size];
        scope.width = thumbSizes[size];
        scope.imgSrc = AvatarService.getAvatarUrl(person, size);
      };

      if (scope.person.$promise) {
        scope.person.$promise.then(() => {
          setImgSrc(scope.person, scope.size);
        });
      } else {
        setImgSrc(scope.person, scope.size);
      }
    }

  };
}



