/*
 * client/js/main/controllers/home.js
 */

var rhtml = require('rhtml'),
    _ = require('lodash');

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('CreatorCtrl', function ($scope, app, Restangular, alert, $state, $stateParams) {
    $scope.app = app;
    
    $scope.sortableFields = {
      placeholder: 'drop-placeholder',
      cancel: '',
      handle: 'button.btn-move-field'
    };
    $scope.sortableOptions = {
      placeholder: 'drop-option-placeholder',
      cancel: '',
      handle: 'button.btn-move-option'
    };
    
    $scope.markAsUnsaved = function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.pendingSave = true;      
      }
    };
    
    $scope.$watch('app.models', $scope.markAsUnsaved, true);
    $scope.$watch('app.title', $scope.markAsUnsaved);
    
    $scope.addField = function (model) {
      model.fields.push({
        title: "New Field",
        type: 'String' 
      });
    };
    
    $scope.deleteField = function(model, index) {
      model.fields.splice(index, 1);
    };
    
    $scope.deleteModel = function(index) {
      app.models.splice(index, 1);
    };
    
    $scope.addModel = function (model) {
      var newModel = {
        title: "New Model",
        fields: []
      };
      $scope.addField(newModel);
      app.models.push(newModel);
    };
    
    $scope.saveApp = function() {
      
      if ($stateParams.appId !== 'new') {
        console.log(app);
        app.put().then(
          function (app) {
            $scope.pendingSave = false;
          }
        );
      } else {
        Restangular.all('apps').post(app).then(
          function (app) {
            $state.go('app.creator', { appId: app._id });
          }
        );
      }
    };
    
  }).directive('editableField', function() {
    return {
      replace: true,
      template: rhtml('../templates/edit-field.html'),
      controller: function($scope) {
        
        // For one to many
        $scope.selectableModels = _.filter($scope.app.models, function(model) {
          return model.title !== $scope.model.title;
        });
        
        $scope.initEditMode = function(newValue, oldValue) {
          if (newValue !== oldValue) {
            if ($scope.field.type == 'Dropdown') {
              $scope.optionsList = _.clone($scope.field.extra);
            } 
          }
        };

        $scope.initEditField = function(newValue, oldValue) {
          if (newValue !== oldValue) {
            if ($scope.field.type === 'Dropdown') {
              $scope.field.extra = [];
              $scope.optionsList = [];
            } else if ($scope.field.type === 'OneToMany') {
              $scope.field.extra = $scope.selectableModels[0].title || '';
            }
          }
        };
        
        $scope.$watch('editMode', $scope.initEditMode);
        $scope.$watch('field.type', $scope.initEditField);
        
        $scope.addOption = function(newOption) {
          $scope.field.extra.push(newOption);
          $scope.optionsList.push(newOption);
        };
                
        $scope.deleteOption = function(index) {
          $scope.field.extra.splice(index, 1);
          $scope.optionsList.splice(index, 1);
        };        
      },
      link: function(scope, element, attrs) {
      }
    };
  }).directive('editableModelSettings', function() {
    return {
      replace: true,
      template: rhtml('../templates/edit-model-settings.html'),
      controller: function($scope, app) {
        // Populate the labelField
        $scope.labelFieldOptions = {
          multiple: true,
          simple_tags: true,
          tags: _.map($scope.model.fields, function(field) { 
            return field.title; 
          })
        };
        $scope.boolToStr = function(value) {
          return value ? 'Yes' : 'No';
        };
      },
      link: function(scope, element, attrs) {
      }
    };
  });
};
