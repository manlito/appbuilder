'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Apps = mongoose.model('apps', new Schema({ any: Schema.Types.Mixed }));

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
            console.log(app);
            return res.json(app);
        } else {
            return res.send(err);
        }
    });
};