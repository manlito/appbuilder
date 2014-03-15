/*
 * client/js/main/controllers/home.js
 */

var _ = require('lodash'),
  rhtml = require('rhtml');

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('ListCtrl', function ($http, $rootScope, $scope, models, format, app, appData, Restangular, alert, $stateParams) {
    $scope.model = _.find(app.models, function(model) {
      return model.title === $stateParams.model;
    });

    $scope.deleteRecord = function(record) {
      console.log('removing');
    };

    $scope.formatRecord = function(record, field) {
      var model = models.getModelById(app.models, field.extra);
      return format.formatRecord(model, appData, record, field);
    };

    // Avoid showing the welcome message when loading
    $scope.showWelcome = false;

    /** start populateRecords **/
    $scope.records = appData[$scope.model.id];
    /** end populateRecords **/

    $scope.$watch('records', function() {
      $scope.showWelcome = typeof $scope.records === 'undefined' || $scope.records.length == 0;
    }, true);
  });
};
