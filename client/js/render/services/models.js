/*
 * client/js/layout/services/layout.js
 */

'use strict';

var _ = require('lodash'),
    $ = require('jquery');


function getModelById(appModels, modelId) {
  return _.find(appModels, function(model) {
    return model.id === modelId;
  });
}

function getModelByTitle(appModels, modelTitle) {
  return _.find(appModels, function(model) {
    return model.title === modelTitle;
  });
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.provider('models', {    
    $get: function () {
      return {
        getModelById: getModelById,
        getModelByTitle: getModelByTitle
      };
    }
  });
};
