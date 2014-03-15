'use strict';

angular.module('appbuilderApp')
    .service('App', function App($http) {

        // AngularJS will instantiate a singleton by calling "new" on this function

        return $http.get('/api/app')
            .success(function(app) {
                return app;
            })
            .error(function() {
                return {
                    title: "App could not be loaded"
                };
            })

    });


angular.module('appbuilderApp')
    .service('AppTitle', function App($http) {

        return $http.get('/api/app/title')
            .success(function(app) {
                return app;
            })
            .error(function() {
                return {
                    title: "AppBuilder"
                };
            })

    });
