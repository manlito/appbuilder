'use strict';

var ultimate = require('ultimate');

var mongoose = ultimate.lib.mongoose,
    plugin = ultimate.db.mongoose.plugin;

// Schema Item
var itemSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true },
  type: { type: String },
  extra: { type: 'Mixed' }
}, { _id : false });

module.exports.itemSchema = itemSchema;

// Schema Model
var modelSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true },
  labelField: [ String ],
  showInMenu: { type: Boolean, 'default': true },
  fields: [ itemSchema ] 
}, { _id : false });

module.exports.modelSchema = modelSchema;
