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
  var dirname = 'release';
  ncp('./ultimate', './build/' + dirname, function (err) {
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
  ncp('./ultimate-replaces', './build/' + dirname, function (err) {
    if (err) {
      console.error(err);
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(appBuild);
    }
  });
  return deferred.promise;
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

function addRoutes(appBuild) {
  console.log("Step addRoutes");
  var filename = 'build/' + appBuild.dirname + '/server/routes.js';
  var search = "  // API";
  var replace = "// AppBuilder" + "\n"
    + "  s.get('/api/app', c.appBuilder.getApp);" + "\n"
    + "  s.get('/api/app/title', c.appBuilder.getTitle);" + "\n"
    + "  s.get('/api/app/models/:modelId/records', c.appBuilder.getRecords);" + "\n"
    + "  s.get('/api/app/model/:modelId/record/:recordId', c.appBuilder.getRecord);" + "\n"
    + "  s.post('/api/app/model/:modelId/record', c.appBuilder.saveRecord);" + "\n"
    + "  s.put('/api/app/model/:modelId/record/:recordId', c.appBuilder.updateRecord);" + "\n"
    + "\n" + search;
  return replaceString(appBuild, filename, search, replace);
}

function registerRenderControllers(appBuild) {
  console.log("Step registerRenderControllers");
  var filename = 'build/' + appBuild.dirname + '/client/js/index.js';
  var search = "require('./shared');";
  var replace = search + "\n"
    + "require('./render');"
    + "\n\n"
    + "// Additional modules\n"
    + "require('angular.ui.select2');\n"
    + "require('angular.storage');\n";
  return replaceString(appBuild, filename, search, replace);
}

function convertFromPreview(appBuild) {
  console.log("Step convertFromPreview");
  var filename = 'build/' + appBuild.dirname + '/client/js/render/index.js';
  var deferred = Q.defer();

  fs.readFile(filename, 'utf8', function (err,data) {
    if (err) {
      console.log(err);
      deferred.reject(new Error(err));
    } else {
      var result = data.replace(/app.preview/g, "app.render");
      result = result.replace("/preview/:appId", "/app");
      result = result.replace(/if \(\$stateParams\.appId[^\}]*\}/, "return $http.get('/api/app').then(function(data) { return data.data; });");

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

function copyRenderControllers(appBuild) {
  return copyFiles(appBuild, '../client/js/render/', 'build/' + appBuild.dirname + '/client/js/render/');
}

function copyDependencies(appBuild) {
  return copyFiles(appBuild, '../client/js/node_modules/', 'build/' + appBuild.dirname + '/client/js/node_modules/');
}

function copyFiles(appBuild, sourceDir, targetDir) {
  console.log("Step CopyFiles: " + sourceDir + " --> " + targetDir);
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

function addDependencies(appBuild) {
  var filename = 'build/' + appBuild.dirname + '/client/js/app.js';
  var search = "  'app.main'";
  var replace = search + ",\n"
    + "  'LocalStorageModule',"
    + "  'ui.select2'"
    + "";
  return replaceString(appBuild, filename, search, replace);
}

function addAppTitle(appBuild) {
  console.log("Step addAppTitle");
  var filename = 'build/' + appBuild.dirname + '/client/js/layout/index.js';
  var search = "views: _views";
  var replace = search + ",\n"
    + "    resolve: { appTitle: ['$http', function($http) { return $http.get('/api/app/title').then(function(data) { return data.data; }); } ] } "
    + "";
  return replaceString(appBuild, filename, search, replace);
}

function addAppTitleDependency(appBuild) {
  console.log("Step addAppTitleDependency");
  var filename = 'build/' + appBuild.dirname + '/client/js/layout/controllers/_nav.js';
  var search = "'_NavCtrl', function (";
  var replace = search + "appTitle, ";
  return replaceString(appBuild, filename, search, replace);
}

function addAppTitleToScope(appBuild) {
  console.log("Step addAppTitleToScope");
  var filename = 'build/' + appBuild.dirname + '/client/js/layout/controllers/_nav.js';
  var search = "_o =";
  var replace = "$scope.appTitle = appTitle; " + search ;
  return replaceString(appBuild, filename, search, replace);
}

function setRenderModeInScope(appBuild) {
  console.log("Step setRenderModeInScope");
  var filename = 'build/' + appBuild.dirname + '/client/js/app.js';
  var search = "    config: app.config,";
  var replace = search + "\n    production: true,";
  return replaceString(appBuild, filename, search, replace);
}

function launchApp(appBuild) {
  var command = 'cd build/' + appBuild.dirname + '; grunt ;';
  console.log("Step launchApp: " + command);
  exec(command, function(error, stdout, stderr) {
    sys.puts(stdout);
  });
}

function replacePreviewInTemplateDefault(appBuild) {
  return replacePreviewInTemplatesAndControllers(appBuild, 'templates/default.html');
}

function replacePreviewInTemplateList(appBuild) {
  return replacePreviewInTemplatesAndControllers(appBuild, 'templates/list.html');
}

function replacePreviewInTemplateEdit(appBuild) {
  return replacePreviewInTemplatesAndControllers(appBuild, 'templates/edit.html');
}

function replacePreviewInControllerEdit(appBuild) {
  return replacePreviewInTemplatesAndControllers(appBuild, 'controllers/edit.js');
}

function replacePreviewInTemplatesAndControllers(appBuild, template) {
  return replaceString(appBuild,
    'build/' + appBuild.dirname + '/client/js/render/' + template,
    /app\.preview/g,
    "app.render");
}

function copyCSSs(appBuild) {
  return copyFiles(appBuild, '../client/less/', 'build/' + appBuild.dirname + '/client/less/');
}

function replaceTitle(appBuild) {
  var filename = 'build/' + appBuild.dirname + '/server/views/_layouts/default.hbs';
  var search = '<title ng-bind="config.title"></title>';
  var replace = '<title ng-bind="config.title">AppBuilder</title>';
  return replaceString(appBuild, filename, search, replace);
}
function replaceConfigTitle(appBuild) {
  return replaceString(appBuild,
    'build/' + appBuild.dirname + '/client/js/shared/services/app.js',
    "title: 'ultimate-seed'",
    "title: 'AppBuilder'");
}

function replaceCodeList(appBuild) {
  return replaceCodeBlock(appBuild,
    'build/' + appBuild.dirname + '/client/js/render/controllers/list.js',
    'populateRecords',
    "$http.get('/api/app/models/' + $scope.model.id + '/records').success(function(records) { $scope.records = records; });");
}

function replaceCodeInsertRecord(appBuild) {
  console.log("Step replaceCodeInsertRecord" );
  return replaceCodeBlock(appBuild,
      'build/' + appBuild.dirname + '/client/js/render/controllers/edit.js',
    'saveRecord',
    "$http.post('/api/app/model/' + $scope.model.id + '/record', $scope.recordData).success(function(record) { });");
}

function replaceCodeUpdateRecord(appBuild) {
  console.log("Step replaceCodeUpdateRecord" );
  return replaceCodeBlock(appBuild,
      'build/' + appBuild.dirname + '/client/js/render/controllers/edit.js',
    'updateRecord',
    "$scope.removeOneToManyRelated(recordData).put();");
}

function replaceReferenceInFieldOneToMany(appBuild) {
  console.log("Step replace Query OneToMany fields" );
  return replaceString(appBuild,
    'build/' + appBuild.dirname + '/client/js/render/templates/field.html',
    'record in appData[field.extra]',
    'record in relatedItemOptions[field.id]');
}


function replaceCodeForOneToMany(appBuild) {
  console.log("Step replace Query OneToMany fields" );
  return replaceCodeBlock(appBuild,
    'build/' + appBuild.dirname + '/client/js/render/controllers/edit.js',
    'getRelatedFields',
    "$scope.relatedItemOptions = $scope.relatedItemOptions || {};\n" +
    "        $http.get('/api/app/models/' + field.extra + '/records').success(function(data, status, headers, config) {\n" +
    "          $scope.relatedItemOptions[field.id] = data;\n" +
    "        });");
}

function replaceResolveForOneToMany(appBuild) {
  return replaceCodeBlock(appBuild,
    'build/' + appBuild.dirname + '/client/js/render/index.js',
    'getRecordData',
    "return Restangular.one('app').one('model', model.id).one('record', $stateParams.recordId).get();");
}



function replaceCodeBlock(appBuild, filename, tag, content) {
  var search = new RegExp("\\/\\*\\* start " + tag + "(.|\n)*?" + tag + "[^\\/]+\\/","g");
  return replaceString(appBuild,
    filename,
    search,
    content);
}

function addngRunConfigurations(appBuild) {
  var select2 = "\n\nngModule.run(['uiSelect2Config', function(uiSelect2Config) {\n"
  + "uiSelect2Config.width = '100%'; \n"
  + "uiSelect2Config.allowClear = true;\n"
  + "uiSelect2Config.containerCssClass = 'select2boostrap-container'\n"
  + "uiSelect2Config.dropdownCssClass = 'select2boostrap-dropdown'\n"
  + "}]);";

  return appendString(appBuild,
    'build/' + appBuild.dirname + '/client/js/app.js',
    select2);

}

function appendString(appBuild, filename, content) {
  var deferred = Q.defer();

  fs.readFile(filename, 'utf8', function (err,data) {
    if (err) {
      console.log(err);
      deferred.reject(new Error(err));
    } else {
      var result = data += content;

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

  steps = [cleanFolder, copyBaseFiles, copyRenderControllers, copyDependencies, addDependencies,
    registerRenderControllers, convertFromPreview, addRoutes, addAppTitle, addAppTitleDependency, addAppTitleToScope, addngRunConfigurations,
    setRenderModeInScope, copyCSSs, overWriteBase, replacePreviewInTemplateDefault, replacePreviewInTemplateList, replacePreviewInTemplateEdit,
    replacePreviewInControllerEdit, replaceTitle, replaceConfigTitle, replaceCodeList, replaceCodeInsertRecord, replaceCodeUpdateRecord,
    replaceReferenceInFieldOneToMany, replaceCodeForOneToMany, replaceResolveForOneToMany  // For OneToMany fields
  ];

  var result = Q({});

  steps.forEach(function(f) {
    result = result.then(f);
  });