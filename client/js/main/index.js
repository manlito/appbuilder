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
                "id": "m6104102414101362",
                "title": "Contacto",
                "fields": [
                  {
                    "id": "f20813365024514496",
                    "title": "Nombre",
                    "type": "String"
                  },
                  {
                    "id": "f18818561104126275",
                    "title": "Ciudad",
                    "type": "String"
                  },
                  {
                    "id": "f6773503618314862",
                    "title": "Empresa",
                    "type": "OneToMany",
                    "extra": "m9856685441918671"
                  }
                ],
                "showInMenu": true,
                "labelField": [
                  "f20813365024514496"
                ]
              },
              {
                "id": "m9856685441918671",
                "title": "Empresa",
                "fields": [
                  {
                    "id": "f5080045296344906",
                    "title": "Nombre",
                    "type": "String"
                  },
                  {
                    "id": "f40268137492239475",
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
                    "id": "f12555734277702868",
                    "title": "Contactos",
                    "type": "OneToManyRelated",
                    "extra": {
                      "relatedFieldId": "f6773503618314862",
                      "relatedModelId": "m6104102414101362"
                    }
                  }
                ],
                "showInMenu": true,
                "labelField": [
                  "f5080045296344906"
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

// Authorizations
ngModule.run(function (auth) {
  auth.authorize({
    'app.apps': {
      allow: ['user']
    }
  });
});
