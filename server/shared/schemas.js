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


// Schema Model
var modelSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true },
  labelField: [ String ],
  showInMenu: { type: Boolean, 'default': true },
  fields: [ itemSchema ]
}, { _id : false });

var appSchema = new mongoose.Schema({
  title: { type: String, required: true },
  models: [modelSchema],
  userId: mongoose.Schema.Types.ObjectId
});
// Duplicate the ID field.
appSchema.virtual('id').get(function(){
  return this._id.toHexString();
});
// Ensure virtual fields are serialised.
appSchema.set('toJSON', {
  virtuals: true
});

module.exports.itemSchema = itemSchema;
module.exports.modelSchema = modelSchema;
module.exports.appSchema = appSchema;
