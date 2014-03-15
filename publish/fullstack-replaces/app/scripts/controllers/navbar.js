'use strict';

angular.module('appbuilderApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, AppTitle) {
    $scope.menu = [{
        'title': 'Home',
        'link': '/'
    }];

    AppTitle.then(function(app) {
        $scope.appTitle = app.data.title;
    });
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
