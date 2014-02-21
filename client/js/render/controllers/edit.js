/*
 * client/js/main/controllers/home.js
 */

var _ = require('lodash'),
    rhtml = require('rhtml');

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('EditCtrl', function ($scope, format, models, app, appData, recordData, Restangular, alert, $state, $stateParams) {
    $scope.model = _.find(app.models, function(model) {
      return model.title === $stateParams.model;
    });
    $scope.recordData = _.clone(recordData); 
    
    // For concept proof
    $scope.appData = appData;
    
    $scope.getModelName = function(modelId) {
      return models.getModelById(app.models, modelId).title;   
    };
    
    $scope.getFormattedOption = function(modelId, record) {
      var model = models.getModelById(app.models, modelId);
      return format.formatOption(model, record);
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
