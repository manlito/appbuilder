/*
 * client/js/layout/services/layout.js
 */

'use strict';

var _ = require('lodash'),
    $ = require('jquery');

function formatRecord(model, appData, record, field) {
  switch (field.type) {
    case 'OneToMany': {
      var relatedRecord = _.find(appData[field.extra], function(searchRecord) {
        return searchRecord.id === record[field.id];
      });
      return formatOption(model, relatedRecord);
    }
    default: return record[field.id];
  }
}

function formatOption(model, record) {
  var formattedLabel = [];

  if (model.labelField.length !== 0) {
    formattedLabel = _.map(model.labelField, function(field) {
      return record[field];
    });
  } else {
    formattedLabel = _.map(model.fields, function(field) {
      return record[field.id];
    });
  };
  
  return formattedLabel.join(' ');
};

function formatPlaceholder(model) {
  return model.title;
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.provider('format', {    
    $get: function () {
      return {
        formatRecord: formatRecord,
        formatOption: formatOption,
        formatPlaceholder: formatPlaceholder
      };
    }
  });
};
