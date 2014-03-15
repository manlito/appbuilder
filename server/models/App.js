/*
 * server/models/Model.js
 */

'use strict';

var ultimate = require('ultimate');

var mongoose = ultimate.lib.mongoose,
    plugin = ultimate.db.mongoose.plugin,
    type = ultimate.db.mongoose.type;

var app = require('../app');

// Schema
var schema = new mongoose.Schema({
  title: { type: String, required: true },
  models: [app.shared.schemas.modelSchema]
});

// Restify
schema.restify = {
  'list,get,post,put,delete': {
    'admin': '*'
  }
};

// Plugins
schema.plugin(plugin.findOrCreate);
schema.plugin(plugin.timestamp);

// Model
var model = mongoose.model('App', schema);

// Public API
exports = module.exports = model;


