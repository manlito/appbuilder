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
    
    $scope.getModelName = function(modelId) {
      return format.getModelById(app.models, modelId).title;   
    };
    
    $scope.getFormattedOption = function(modelId, record) {
      return format.formatOption(app.models, modelId, record);
    };
    
    $scope.save = function() {

      _.assign(recordData, $scope.recordData);
      
      if ($stateParams.recordId === 'new') {
        if (typeof appData[$scope.model.id] === 'undefined') {
          appData[$scope.model.id] = [];          
        }
        appData[$scope.model.id].push($scope.recordData);
      }
      
      $state.go('app.preview.list', { model: $scope.model.title });
    };
  });
};
