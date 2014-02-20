'use strict';

var ultimate = require('ultimate');

var mongoose = ultimate.lib.mongoose,
    plugin = ultimate.db.mongoose.plugin;

// Schema Item
var itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String },
  extra: { type: 'Mixed' }
});

module.exports.itemSchema = itemSchema;

// Schema Model
var modelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  labelField: [ String ],
  showInMenu: { type: Boolean, 'default': true },
  fields: [ itemSchema ] 
});

module.exports.modelSchema = modelSchema;
