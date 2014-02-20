/*
 * client/js/main/controllers/home.js
 */

var rhtml = require('rhtml');

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('AppsCtrl', function ($scope, apps, Restangular) {
    $scope.apps = apps;
    
    $scope.deleteApp = function(app) {
      app.remove().then(function() {
        Restangular.all('apps').getList().then(function(apps) {
          $scope.apps = apps;
        });
      });
    };
  });
};
