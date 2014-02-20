/*
 * client/js/main/controllers/home.js
 */

var _ = require('lodash'),
    rhtml = require('rhtml');

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('EditCtrl', function ($scope, format, app, appData, recordData, Restangular, alert, $state, $stateParams) {
    $scope.model = _.find(app.models, function(model) {
      return model.title === $stateParams.model;
    });
    $scope.recordData = _.clone(recordData); 
    
    // For concept proof
    $scope.appData = appData;
    
    $scope.getFormattedOption = function(relatedModel, record) {
      return format.formatOption(app.models, relatedModel, record);
    };
    
    $scope.save = function() {
      
      _.assign(recordData, $scope.recordData);
      
      if ($stateParams.recordId === 'new') {
        if (typeof appData[$scope.model.title] === 'undefined') {
          appData[$scope.model.title] = [];          
        }
        appData[$scope.model.title].push($scope.recordData);
      }
      
      $state.go('app.preview.list', { model: $scope.model.title });
    };
  });
};
