/*
 * server/models/Model.js
 */

'use strict';

var ultimate = require('ultimate');

var mongoose = ultimate.lib.mongoose,
    plugin = ultimate.db.mongoose.plugin;
    // type = ultimate.db.mongoose.type;

var app = require('../app');

// Schema
var schema = new mongoose.Schema({
  title: { type: String, required: true },
  labelField: { type: String },
  showInMenu: { type: Boolean, 'default': true },
  fields: [ app.shared.schemas.itemSchema] 
});

// Restify
schema.restify = {
  'list,get': '*',
  'post,put,delete': {
    'admin': '*'
  }
};

// Plugins
schema.plugin(plugin.findOrCreate);
schema.plugin(plugin.timestamp);

// Model
var model = mongoose.model('Model', schema);

// Public API
exports = module.exports = model;

// Insert data.
var data = [
  {
    title: 'Contact',
    fields: [
      {
        title: "First",
        type: 'String' 
      },
      {
        title: "Last",
        type: 'String' 
      },
      {
        title: "Company",
        type: 'OneToMany',
        extra: 'Company'
      },
      {
        title: "Age",
        type: 'Number' 
      }
   ]
  },
  {
    title: 'Company',
    fields: [
      {
        title: 'Name', 
        type: 'String' 
      },
      {
        title: 'Industry',
        type: 'Dropdown',
        extra: ['Marketing', 'Internet', 'Other']
      },
      { 
        title: 'Address', 
        type: 'String' 
      }
    ]
  },
  {
    title: 'Tasks',
    fields: [
      {
        title: 'Title', 
        type: 'String' 
      },
      {
        title: 'Type',
        type: 'Dropdown',
        extra: ['Call', 'Meeting']
      },
      { 
        title: 'Notes', 
        type: 'TextArea' 
      }
    ]
  }
];

model.remove(function (err) {
  if (err) { throw err; }
  model.create(data, function (err) {
    if (err) { throw err; }
  });
});
