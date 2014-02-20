/*
 * client/js/shared/directives/focus.js
 */

'use strict';

var _o;

function link(scope, element, attrs) {
  element.bind("keypress", function(event) {
    if (event.which === 13) {
      scope.onEnter();
      scope.$apply();
    }
  });
}

exports = module.exports = function (ngModule) {
  ngModule.directive('enter', function ($parse) {
    _o = {
      $parse: $parse
    };

    return {
      scope: {
        onEnter: "&enterCallback"
      },
      link: link
    };
  });
};
