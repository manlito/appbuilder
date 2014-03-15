/**
 * Created by lito on 3/15/14.
 */

var ultimate = require('ultimate'),
    mongoose = ultimate.lib.mongoose,
    app = require('../../app');
var Apps = mongoose.model('apps', app.shared.schemas.appSchema);

function LIST(req, cb) {
  Apps.find({
    userId: req.user._id
  }, function(err, apps) {
    if (err) {
      return cb(new Error(err));
    } else {
      cb(null, apps);
    }
  });
}

function GET(req, id, cb) {
  console.log(req.params);
  Apps.findOne({
    userId: req.user._id,
    _id: id
  }, function(err, app) {
    if (err) {
      return cb(new Error(err));
    } else {
      cb(null, app);
    }
  });
}

function POST(req, cb) {
  console.log(req.body);
  // Force the user id
  req.body.userId = req.user._id;
  var app = new Apps(req.body);

  app.save(function(err, app) {
    if (err) {
      return cb(new Error(err));
    } else {
      cb(null, app);
    }
  });
}


function PUT(req, id, cb) {
  // Force the user id
  req.body.userId = req.user._id;
  delete req.body._id;

  Apps.findByIdAndUpdate(id, req.body, function(err, app) {
    if (err) {
      return cb(new Error(err));
    } else {
      cb(null, app);
    }
  });
}

function DELETE(req, id, cb) {
  Apps.findOneAndRemove({
    userId: req.user._id,
    _id: id
  }, function(err, app) {
    if (err) {
      return cb(new Error(err));
    } else {
      cb(null, app);
    }
  });
}

exports.LIST = LIST;
exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;