/*
 * client/js/main/controllers/home.js
 */

var _ = require('lodash'),
    rhtml = require('rhtml');

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('ListCtrl', function ($scope, format, app, appData, Restangular, alert, $stateParams) {
    $scope.model = _.find(app.models, function(model) {
      return model.title === $stateParams.model;
    });
    
    $scope.$watch('appData', function(newValue, oldValue) {
     console.log('Changed appDad');
    });
    
    $scope.formatRecord = function(record, field) {
      return format.formatRecord(app.models, appData, record, field);
    };
    
    $scope.records = appData[$scope.model.title];
    $scope.showWelcome = typeof $scope.records === 'undefined' || $scope.records.length == 0;
  });
};
