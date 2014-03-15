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

var appId = "53239755a4aad6f947000008";
var apps = db.get('apps');

var appBuild = {
  appId: appId,
  dirname: "dist" + Math.random(),
  config: {
    dburi: 'mongodb://localhost/appbuilder-render'
  }
}

// Just during development, remove the other builds
function cleanFolder(appBuild) {
  console.log("Step cleanFolder");
  var deferred = Q.defer();
  var command = 'cd user-dist/; rm -rf *; cd ..;';
  exec(command, function(error, stdout, stderr) {
    deferred.resolve(appBuild);
  });
  return deferred.promise;
}

function copyRelease(appBuild) {
  return copyFiles(appBuild,
  "build/release",
  "user-dist/" + appBuild.dirname);
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

function replaceDBDev(appBuild) {
  return replaceString(appBuild,
    'user-dist/' + appBuild.dirname + '/config/development.json',
    '"db": "ultimate-seed"',
    '"db": "appbuilder-render-dev"');
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

function launchApp(appBuild) {
  var command = 'cd user-dist/' + appBuild.dirname + '; grunt ;';
  console.log("Step launchApp: " + command);
  exec(command, function(error, stdout, stderr) {
    sys.puts(stdout);
  });
}


var steps = [cleanFolder, copyRelease, getApp, replaceDBDev, populateRenderDbDevelopment, populateRenderDbProduction, launchApp];

var result = Q(appBuild);

steps.forEach(function(f) {
  result = result.then(f);
});