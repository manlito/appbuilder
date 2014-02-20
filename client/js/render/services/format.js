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
    default: return record[field.title];
  }
}

function formatOption(appModels, relatedModel, record) {
  var formattedLabel = [];

  var targetModel = _.find(appModels, function(model) {
    return model.title === relatedModel;
  });

  if (targetModel.labelField.length !== 0) {
    formattedLabel = _.map(targetModel.labelField, function(field) {
      return record[field];
    });
  } else {
    formattedLabel = _.map(targetModel.fields, function(field) {
      return record[field.title];
    });
  };
  
  return formattedLabel.join(' ');
};
    
// Public API
exports = module.exports = function (ngModule) {
  ngModule.provider('format', {    
    $get: function () {
      return {
        formatRecord: formatRecord,
        formatOption: formatOption
      };
    }
  });
};
