/*
 * client/js/main/controllers/home.js
 */

var _ = require('lodash'),
  rhtml = require('rhtml');

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('EditCtrl', function ($http, $scope, format, models, app, appData, recordData, Restangular, alert, $state, $stateParams) {
    $scope.model = _.find(app.models, function(model) {
      return model.title === $stateParams.model;
    });
    $scope.recordData = _.clone(recordData);

    // For concept proof
    $scope.appData = appData;

    // Get related fields for related... when using LOCALSTORAGE
    $scope.recordDataRelated = {};
    _.each($scope.model.fields, function(field) {
      if (field.type == 'OneToManyRelated') {
        // This iterate over records in the related model
        var relatedRecords = _.filter(appData[field.extra.relatedModelId], function(record) {
          return record[field.extra.relatedFieldId] === recordData.id;
        });
        // Set the selected value
        $scope.recordData[field.id] = relatedRecords;
        // Set all the available objects
        $scope.recordDataRelated[field.id] = appData[field.extra.relatedModelId];
      }
    });

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
        /** start saveRecord **/
        if (typeof appData[$scope.model.id] === 'undefined') {
          appData[$scope.model.id] = [];
        }
        appData[$scope.model.id].push($scope.recordData);
        /** end saveRecord **/
      }

      $state.go('app.preview.list', { model: $scope.model.title });
    };
  });
};
