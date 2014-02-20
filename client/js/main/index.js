/*
 * client/js/main/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.main', ['ngAnimate']);

// Controllers
require('./controllers/home')(ngModule);
require('./controllers/creator')(ngModule);
require('./controllers/apps')(ngModule);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '/',
      views: {
        '@': {
          controller: 'HomeCtrl',
          template: rhtml('./templates/home.html')
        }
      },
      resolve: {
        features: ['Restangular', function (Restangular) {
          return Restangular.all('features').getList();
        }]
      }
    })
    .state('app.creator', {
      url: '/creator/:appId',
      views: {
        '@': {
          controller: 'CreatorCtrl',
          template: rhtml('./templates/creator.html')
        }
      },
      resolve: {
        app: ['Restangular', '$stateParams', function (Restangular, $stateParams) {
          if ($stateParams.appId !== 'new') {
            return Restangular.one('apps', $stateParams.appId).get();            
          }
          // The default
          var d = new Date();
          return {
            title: 'New App: ' + d.toLocaleDateString(),
            models: [
                      {
                        title: 'Contact',
                        fields: [
                          {
                            title: "First",
                            type: 'String' 
                          },
                          {
                            title: "Last",
                            type: 'String' 
                          },
                          {
                            title: "Company",
                            type: 'OneToMany',
                            extra: 'Company'
                          },
                          {
                            title: "Age",
                            type: 'Number' 
                          }
                       ]
                      },
                      {
                        title: 'Company',
                        fields: [
                          {
                            title: 'Name', 
                            type: 'String' 
                          },
                          {
                            title: 'Industry',
                            type: 'Dropdown',
                            extra: ['Marketing', 'Internet', 'Other']
                          },
                          { 
                            title: 'Address', 
                            type: 'String' 
                          }
                        ]
                      },
                      {
                        title: 'Tasks',
                        fields: [
                          {
                            title: 'Title', 
                            type: 'String' 
                          },
                          {
                            title: 'Type',
                            type: 'Dropdown',
                            extra: ['Call', 'Meeting']
                          },
                          { 
                            title: 'Notes', 
                            type: 'TextArea' 
                          }
                        ]
                      }
                ]
          };
        }]
      }
    })
    .state('app.apps', {
      url: '/apps',
      views: {
        '@': {
          controller: 'AppsCtrl',
          template: rhtml('./templates/apps.html')
        }
      },
      resolve: {
        apps: ['Restangular', function (Restangular) {
          return Restangular.all('apps').getList();
        }]
      }
    });
});
