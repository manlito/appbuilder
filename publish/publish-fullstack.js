/**
 * Created by lito on 3/12/14.
 */
var db = require('monk')('localhost/ultimate-seed'),
    Q = require('q'),
    util = require('util'),
    ncp = require('ncp').ncp,
    sys = require('sys'),
    exec = require("child_process").exec,
    fs = require('fs');
ncp.limit = 16;

var appId = "531bfccc1851573270000003";
var apps = db.get('apps');

var appBuild = {
    appId: appId,
    config: {
        dburi: 'mongodb://localhost/appbuilder-render'
    }
}

// Just during development, remove the other builds
function cleanFolder(appBuild) {
    console.log("Step cleanFolder");
    var deferred = Q.defer();
    var command = 'cd build/; rm -rf *; cd ..;';
    exec(command, function(error, stdout, stderr) {
        deferred.resolve(appBuild);
    });
    return deferred.promise;
}

function copyBaseFiles(appBuild) {
    console.log("Step copyBaseFiles");
    var deferred = Q.defer();
    var dirname = 'dist' + Math.random();
    ncp('./fullstack', './build/' + dirname, function (err) {
        if (err) {
            console.error(err);
            deferred.reject(new Error(err));
        } else {
            appBuild.dirname = dirname;
            deferred.resolve(appBuild);
        }
        return dirname;
    });
    return deferred.promise;
}

function overWriteBase(appBuild) {
    var deferred = Q.defer();
    var dirname = appBuild.dirname;
    console.log("Step overWriteBase: dirname is " + dirname);
    ncp('./replaces', './build/' + dirname, function (err) {
        if (err) {
            console.error(err);
            deferred.reject(new Error(err));
        } else {
            deferred.resolve(appBuild);
        }
    });
    return deferred.promise;
}

function getApp(appBuild) {
    var deferred = Q.defer();
    console.log("Step getApp");
    apps.findById(appBuild.appId, function(err, app) {
        if (err) {
            console.error(err);
            deferred.reject(new Error(err));
        } else {
            appBuild.app = app;
            deferred.resolve(appBuild);
        }
    });
    return deferred.promise;
}

function editConfigFileDevelopment(appBuild) {
    return editConfigFile(appBuild, 'development', '-dev');
}

function editConfigFileProduction(appBuild) {
    return editConfigFile(appBuild, 'production', '');
}

function editConfigFile(appBuild, file, dbSuffix) {
    console.log("Step createConfigFile");
    var deferred = Q.defer();

    var filename = 'build/' + appBuild.dirname + '/lib/config/env/' + file + '.js';

    return replaceString(appBuild, filename, 'mongodb://localhost/fullstack' + dbSuffix, appBuild.config.dburi + dbSuffix);
}

function replaceString(appBuild, filename, search, replace) {
    var deferred = Q.defer();

    fs.readFile(filename, 'utf8', function (err,data) {
        if (err) {
            console.log(err);
            deferred.reject(new Error(err));
        } else {
            var result = data.replace(search, replace);

            fs.writeFile(filename, result, 'utf8', function (err) {
                if (err) {
                    console.log(err);
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(appBuild);
                }
            });
        }
    });

    return deferred.promise;
}


function populateRenderDbDevelopment(appBuild) {
    return populateRenderDb(appBuild, '-dev');
}

function populateRenderDbProduction(appBuild) {
    return populateRenderDb(appBuild, '');
}

function populateRenderDb(appBuild, dbSuffix) {
    console.log("Step populateRenderDb");
    var deferred = Q.defer();
    var dbRender = require('monk')(appBuild.config.dburi + dbSuffix),
        apps = dbRender.get('apps');

    apps.findById(appBuild.app._id, function(err, doc){
        if (err) {
            console.error(err);
            deferred.reject(new Error(err));
        } else if (doc) {
            apps.findAndModify({ _id: appBuild.app._id }, appBuild.app, function(err) {
                if (err) {
                    console.error(err);
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(appBuild);
                }
            });
        } else {
            apps.insert(appBuild.app, function(err) {
                if (err) {
                    console.error(err);
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(appBuild);
                }
            });
        }
    });

    return deferred.promise;
}

function addControllers(appBuild) {
    var filename = 'build/' + appBuild.dirname + '/lib/routes.js';
    var search = "api = require('./controllers/api'),";
    var replace = search + "\n"
        + "    appBuilder = require('./controllers/appBuilder'),";
    return replaceString(appBuild, filename, search, replace);
}

function addRoutes(appBuild) {
    var filename = 'build/' + appBuild.dirname + '/lib/routes.js';
    var search = "app.get('/api/awesomeThings', api.awesomeThings);";
    var replace = search + "\n"
        + "  app.get('/api/app', appBuilder.getApp);" + "\n"
        + "  app.get('/api/app/title', appBuilder.getTitle);";
    return replaceString(appBuild, filename, search, replace);
}

function copyRenderControllers(appBuild) {
    return copyFiles(appBuild, '../client/js/render/controllers/', 'build/' + appBuild.dirname + '/app/scripts/controllers');
}

function copyFiles(appBuild, sourceDir, targetDir) {
    var deferred = Q.defer();

    ncp(sourceDir, targetDir, function (err) {
        if (err) {
            console.error(err);
            deferred.reject(new Error(err));
        } else {
            deferred.resolve(appBuild);
        }
    });

    return deferred.promise;
}


function launchApp(appBuild) {
    var command = 'cd build/' + appBuild.dirname + '; grunt serve;';
    console.log("Step launchApp: " + command);
    exec(command, function(error, stdout, stderr) {
        sys.puts(stdout);
    });
}

var steps = [cleanFolder, getApp, copyBaseFiles, copyRenderControllers, overWriteBase,
    populateRenderDbDevelopment, populateRenderDbProduction,
    editConfigFileDevelopment, editConfigFileProduction,
    addControllers, addRoutes, launchApp];

var result = Q(appBuild);

steps.forEach(function(f) {
   result = result.then(f);
});