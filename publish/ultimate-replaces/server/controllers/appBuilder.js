'use strict';

var _ = require('lodash'),
    ultimate = require('ultimate');

var mongoose = ultimate.lib.mongoose,
    Schema = mongoose.Schema;

var Apps = mongoose.model('apps', new Schema({
    title: String,
    models: Schema.Types.Mixed
}));
var AppSchemas = {};
var AppModels = {};

// Creates mongoose models from AppBuilder model
Apps.findOne(function (err, app) {
    if (!err) {
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
            // Create the models
            AppModels[model.id] = mongoose.model(model.id, new Schema(AppSchemas[model.id], {
                collection: model.id
            }));
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
 * Save a record
 */
exports.updateRecord = function(req, res) {
    // Extract the modelId
    var modelId = req.params.modelId;
    var Models = mongoose.model(modelId, new Schema({ any: Schema.Types.Mixed }));

    return Models.findOneAndUpdate({
        _id: ''
    }, req.body, function (err, doc) {
        if (!err) {
            return res.json(doc);
        } else {
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