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
          
          var relatedModelId = 'm' + Math.random();
          var relatedFieldId = 'f' + Math.random();
          return {
            title: 'New App: ' + d.toLocaleDateString(),
            models: [
              {
                "id": "m0.6104102414101362",
                "title": "Contacto",
                "fields": [
                  {
                    "id": "f0.20813365024514496",
                    "title": "Nombre",
                    "type": "String"
                  },
                  {
                    "id": "f0.18818561104126275",
                    "title": "Ciudad",
                    "type": "String"
                  },
                  {
                    "id": "f0.6773503618314862",
                    "title": "Empresa",
                    "type": "OneToMany",
                    "extra": "m0.9856685441918671"
                  }
                ],
                "showInMenu": true,
                "labelField": [
                  "f0.20813365024514496"
                ]
              },
              {
                "id": "m0.9856685441918671",
                "title": "Empresa",
                "fields": [
                  {
                    "id": "f0.5080045296344906",
                    "title": "Nombre",
                    "type": "String"
                  },
                  {
                    "id": "f0.40268137492239475",
                    "title": "Tipo",
                    "type": "Dropdown",
                    "extra": [
                      "Agroquímicos",
                      "Veterinaria",
                      "Venta de Ganado",
                      "Otro"
                    ]
                  },
                  {
                    "id": "r0.12555734277702868",
                    "title": "Contactos",
                    "type": "OneToManyRelated",
                    "extra": {
                      "relatedFieldId": "f0.6773503618314862",
                      "relatedModelId": "m0.6104102414101362"
                    }
                  }
                ],
                "showInMenu": true,
                "labelField": [
                  "f0.5080045296344906"
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
