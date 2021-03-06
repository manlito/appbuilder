/*
 * client/js/app.js
 */

'use strict';

var _ = require('lodash'),
    $ = require('jquery'),
    angular = require('angular'),
    moment = require('moment'),
    socketio = require('socketio');

var ngModule = angular.module('app', [
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'pascalprecht.translate',
  'restangular',
  'ui.bootstrap',
  'ui.router',
  'ui.select2',
  'ui.sortable',
  'LocalStorageModule',
  'ui.utils',
  'xeditable',
  'app.shared',
  'app.layout',
  'app.account',
  'app.admin',
  'app.auth',
  'app.main'
]);

// Enable HTML5 Mode.
ngModule.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});

// Set Restangular base URL.
ngModule.config(function (RestangularProvider) {
  RestangularProvider
    .setBaseUrl('/api')
    .setResponseExtractor(function (res) {
      return res.result;
    })
    .setErrorInterceptor(function (res) {
    return res.success;
    });
});

// XEditable Settings
ngModule.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

// Select2 Settings
ngModule.run(['uiSelect2Config', function(uiSelect2Config) {
    uiSelect2Config.width = "100%";
    uiSelect2Config.allowClear = true;
    uiSelect2Config.containerCssClass = 'select2boostrap-container';
    uiSelect2Config.dropdownCssClass = 'select2boostrap-dropdown';
}]);
// Routes
ngModule.config(function ($stateProvider, $urlRouterProvider, layoutProvider) {
  $stateProvider
    .state('express', {
      url: '*path',
      views: layoutProvider.getViews(),
      onEnter: function () {
        if (_.isPlainObject(global.config) && !!global.config.catchAll) {
          global.location.replace('/404.html');
        }
      }
    });
});

// Load user from global variable sent from server.
ngModule.config(function (authProvider) {
  if (_.isPlainObject(global.config) && global.config.user) {
    authProvider.initUser(global.config.user);
  }
});

// Attach variables to $rootScope.
ngModule.run(function ($location, $rootScope, $state, $stateParams, app, auth) {
  _.assign($rootScope, {
    _: _,
    $: $,
    $location: $location,
    $state: $state,
    $stateParams: $stateParams,
    app: app,
    config: app.config,
    moment: moment,
    user: auth.getUser()
  });
});

// Loading spinner.
ngModule.run(function ($rootScope, layout) {
  var commonFunc = function (spinnerFunc, event, toState) {
    if (!toState.resolve || _.isEmpty(toState.resolve)) { return; }
    spinnerFunc();
  };
  $rootScope.$on('$stateChangeStart', _.wrap(layout.startSpinner, commonFunc));
  $rootScope.$on('$stateChangeSuccess', layout.stopSpinner);
  $rootScope.$on('$stateChangeError', layout.stopSpinner);
});

// Connect to socket.io server.
ngModule.run(function () {
  var retryInterval = 5000,
      retryTimer;

  (function connect() {
    clearInterval(retryTimer);

    var socket = global.socket = socketio.connect('', {
      'force new connection': true,
      'max reconnection attempts': Infinity,
      'reconnection limit': 10 * 1000
    });

    socket.on('connect', function () {
      socket.emit('info', {
        // modernizr: Modernizr,
        navigator: _.transform(navigator, function (result, val, key) {
          if (_.isString(val)) {
            result[key] = val;
          }
        })
      });
    });

    socket.on('test', function (data) {
      console.log(data);
      socket.emit('test', { hello: 'from browser world' });
    });

    retryTimer = setInterval(function () {
      if (!socket.socket.connected &&
          !socket.socket.connecting &&
          !socket.socket.reconnecting) {
        connect();
      }
    }, retryInterval);
  }());
});
