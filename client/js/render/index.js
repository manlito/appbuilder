/*
 * client/js/main/index.js
 */

'use strict';

var angular = require('angular'),
    _ = require('lodash'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.main');

// Services
require('./services/format')(ngModule);
require('./services/models')(ngModule);

// Controllers
require('./controllers/default')(ngModule);
require('./controllers/list')(ngModule);
require('./controllers/edit')(ngModule);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.preview', {
      url: '/preview/:appId',
      views: {
        '@': {
          controller: 'DefaultCtrl',
          template: rhtml('./templates/default.html')
        }
      },
      resolve: {
        app: ['Restangular', '$stateParams', function (Restangular, $stateParams) {
          if ($stateParams.appId !== 'new') {
            return Restangular.one('apps', $stateParams.appId).get();            
          }
        }],
        appData: ['localStorageService', '$stateParams', function (localStorageService, $stateParams) {
          return localStorageService.get('app' + $stateParams.appId) || {};
        }]
      }
    })
    .state('app.preview.home', {
      url: '/home',
      template: rhtml('./templates/home.html')
    })
    .state('app.preview.edit', {
      url: '/:model/edit/:recordId',
      template: rhtml('./templates/edit.html'),
      controller: 'EditCtrl',
      resolve: {
        recordData: ['Restangular', '$stateParams', 'app', 'appData', 'models', function (Restangular, $stateParams, app, appData, models) {
          if ($stateParams.recordId !== 'new') {
            var model = models.getModelByTitle(app.models, $stateParams.model);
            return  _.find(appData[model.id], function(modelData) {
              return modelData.id === $stateParams.recordId; 
            });
            //return Restangular.one('apps', $stateParams.appId).get();            
          }
          return {
            id: 'field' + Math.random()
          };
        }]
      }
    })
    .state('app.preview.list', {
      url: '/:model',
      template: rhtml('./templates/list.html'),
      controller: 'ListCtrl'
    });
});
