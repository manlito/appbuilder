/*
 * client/js/layout/services/layout.js
 */

'use strict';

var _ = require('lodash'),
    $ = require('jquery');

function formatRecord(appModels, appData, record, field) {
  switch (field.type) {
    case 'OneToMany': {      
      var relatedRecord = _.find(appData[field.extra], function(searchRecord) {
        return searchRecord.id === record[field.title];
      });
      return formatOption(appModels, field.extra, relatedRecord);
    }
    default: return record[field.id];
  }
}

function formatOption(appModels, relatedModel, record) {
  var formattedLabel = [];

  var targetModel = getModelById(appModels, relatedModel);

  if (targetModel.labelField.length !== 0) {
    formattedLabel = _.map(targetModel.labelField, function(field) {
      return record[field];
    });
  } else {
    formattedLabel = _.map(targetModel.fields, function(field) {
      return record[field.id];
    });
  };
  
  return formattedLabel.join(' ');
};

function formatPlaceholder(appModels, modelId) {
  return getModelById(appModels, modelId).title;
}

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
  ngModule.provider('format', {    
    $get: function () {
      return {
        formatRecord: formatRecord,
        formatOption: formatOption,
        getModelById: getModelById,
        getModelByTitle: getModelByTitle,
        formatPlaceholder: formatPlaceholder
      };
    }
  });
};
