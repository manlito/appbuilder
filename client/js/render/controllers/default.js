/*
 * client/js/main/controllers/home.js
 */

var rhtml = require('rhtml');

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('DefaultCtrl', function ($scope, app, appData, Restangular, alert, $state, $stateParams, localStorageService) {
    $scope.app = app;
    
    $scope.savePreviewData = function() {
      localStorageService.add('app' + $stateParams.appId, appData);
      alert.addMessage('success', 'Saved the data');
    };
        
    $scope.removePreviewData = function() {
      localStorageService.remove('app' + $stateParams.appId);
      appData = {};      
      $state.reload();
      $state.go('app.preview.home');
      alert.addMessage('success', 'Removed the data');
    };
    
  }).directive('field', function() {
    return {
      replace: true,
      template: rhtml('../templates/field.html'),
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
      }
    };
  });
};
