/*
 * client/js/main/controllers/home.js
 */

var _ = require('lodash'),
    rhtml = require('rhtml');

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('ListCtrl', function ($scope, models, format, app, appData, Restangular, alert, $stateParams) {
    $scope.model = _.find(app.models, function(model) {
      return model.title === $stateParams.model;
    });
    
    $scope.formatRecord = function(record, field) {
      var model = models.getModelById(app.models, field.extra);
      return format.formatRecord(model, appData, record, field);
    };
    
    $scope.records = appData[$scope.model.id];
    $scope.showWelcome = typeof $scope.records === 'undefined' || $scope.records.length == 0;
  });
};
