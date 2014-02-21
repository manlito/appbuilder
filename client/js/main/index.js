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
                        id: 'm' + Math.random(),
                        title: 'Contact',
                        fields: [
                          {
                            id: 'f' + Math.random(),
                            title: "First",
                            type: 'String' 
                          },
                          {
                            id: 'f' + Math.random(),
                            title: "Last",
                            type: 'String' 
                          },
                          {
                            id: 'f' + Math.random(),
                            title: "Company",
                            type: 'OneToMany',
                            extra: 'Company'
                          },
                          {
                            id: 'f' + Math.random(),
                            title: "Age",
                            type: 'Number' 
                          }
                       ]
                      },
                      {
                        id: 'm' + Math.random(),
                        title: 'Company',
                        fields: [
                          {
                            id: 'f' + Math.random(),
                            title: 'Name', 
                            type: 'String' 
                          },
                          {
                            id: 'f' + Math.random(),
                            title: 'Industry',
                            type: 'Dropdown',
                            extra: ['Marketing', 'Internet', 'Other']
                          },
                          { 
                            id: 'f' + Math.random(),
                            title: 'Address', 
                            type: 'String' 
                          }
                        ]
                      },
                      {
                        id: 'm' + Math.random(),
                        title: 'Tasks',
                        fields: [
                          {
                            id: 'f' + Math.random(),
                            title: 'Title', 
                            type: 'String' 
                          },
                          {
                            id: 'f' + Math.random(),
                            title: 'Type',
                            type: 'Dropdown',
                            extra: ['Call', 'Meeting']
                          },
                          { 
                            id: 'f' + Math.random(),
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
