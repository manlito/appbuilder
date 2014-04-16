'use strict';

var _ = require('lodash'),
  Q = require('q'),
  ultimate = require('ultimate');

var mongoose = ultimate.lib.mongoose,
  Schema = mongoose.Schema;

var Apps = mongoose.model('apps', new Schema({
  title: String,
  models: Schema.Types.Mixed
}));
var AppSchemas = {};
var AppModels = {};
var appDefinition = {};

// Creates mongoose models from AppBuilder model
Apps.findOne(function (err, app) {
  if (!err) {
    appDefinition = app;
    console.log("Models: ");
    _.forEach(app.models, function(model) {
      AppSchemas[model.id] = {};
      // Populate the schemas
      _.forEach(model.fields, function(field) {
        var schema;
        switch (field.type) {
          // TODO: Classify correctly the types
          default: schema = Schema.Types.Mixed;
        }
        AppSchemas[model.id][field.id] = schema;
      });
      var modelSchema = new Schema(AppSchemas[model.id], {
        collection: model.id
      });
      // Make sure id is populate when querying
      modelSchema.set('toJSON', {
        virtuals: true
      });
      // Create the models
      AppModels[model.id] = mongoose.model(model.id, modelSchema);
      console.log(AppSchemas[model.id]);
    });
  }
});


/**
 * Load the App definition
 */
exports.getApp = function(req, res) {
  return Apps.findOne(function (err, app) {
    if (!err) {
      return res.json(app);
    } else {
      return res.send(err);
    }
  });
};


/**
 * Load the App Title
 */
exports.getTitle = function(req, res) {
  return Apps.findOne({}, 'title', function (err, app) {
    if (!err) {
      return res.json(app);
    } else {
      return res.send(err);
    }
  });
};

/**
 * Save a record
 */
exports.saveRecord = function(req, res) {
  // Extract the modelId
  var modelId = req.params.modelId;

  // Create instance
  var record = new AppModels[modelId];

  // Populate field values
  console.log("Kyes: ");
  _.forEach(req.body, function(fieldValue, key) {
    console.log(key);
    record[key] = fieldValue;
  });

  console.log(req.body);
  console.log(record);

  return record.save(function (err, doc) {
    if (!err) {
      return res.json(doc);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
};


/**
 * Update a record
 */
exports.updateRecord = function(req, res) {
  // Extract the modelId
  var modelId = req.params.modelId;
  var recordId = req.params.recordId;

  console.log("Updating record " + recordId);
  // Clear the Id
  delete req.body.id;
  delete req.body._id;
  delete req.body.__v;
  console.log(req.body);

  return AppModels[modelId].findByIdAndUpdate(recordId, req.body, function (err, doc) {
    if (!err) {
      return res.json(doc);
    } else {
      console.log(err);
      return res.send(err);
    }
  })
};

/**
 * Load the Data for the requested model
 */
exports.getRecords = function(req, res) {
  var modelId = req.params.modelId;
  return AppModels[modelId].find({}, function (err, records) {
    if (!err) {
      return res.json(records);
    } else {
      return res.send(err);
    }
  });
};

function getModelDefinition(modelId) {
  return _.find(appDefinition.models, function(model) {
    return model.id === modelId;
  });
}

/**
 * Load a single record
 */
exports.getRecord = function(req, res) {
  var modelId = req.params.modelId;
  var recordId = req.params.recordId;
  var modelDefinition = getModelDefinition(modelId);

  return AppModels[modelId].findById(recordId, function (err, record) {
    if (!err) {
      // Populate OneToManyRelated with related items
      var relatedFieldsToQuery = [];
      console.log(record);
      _.forEach(modelDefinition.fields, function(field) {
        if (field.type === 'OneToManyRelated') {

          relatedFieldsToQuery.push(function(record) {
            var deferred = Q.defer();

            var relatedFieldLookUp = {};
            relatedFieldLookUp[field.extra.relatedFieldId] = record.id;
            AppModels[field.extra.relatedModelId].find(relatedFieldLookUp, function(err, records) {
              console.log(field);
              if (!err) {
                record[field.id] = records;
                deferred.resolve(record);
              } else {
                return res.send(err);
                deferred.reject(record);
              }
            });
            return deferred.promise;
          });
        }
      });

      var result = Q(record);

      relatedFieldsToQuery.forEach(function(f) {
        result = result.then(f);
      });

      // Finally send the record
      result.then(function(record) {
        console.log(record);
        return res.json({
          result: record
        });
      });

    } else {
      return res.send({
        message: err
      });
    }
  });
};