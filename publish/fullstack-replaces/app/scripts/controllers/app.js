'use strict';

angular.module('appbuilderApp')
    .controller('AppCtrl', function ($scope, $http, App) {
        App.then(function(app) {
            console.log(app);
            $scope.App = app.data;
        })
    });
