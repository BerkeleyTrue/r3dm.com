var keystone = require('keystone'),
    debug = require('debug')('r3dm:services:blog');

var performQuery = function(whereClause, limit, skip, cb) {
  var Post = keystone.list('Post');

  debug('where', whereClause);
  debug('reading posts');
  Post
    .model
    .find(whereClause)
    .populate('author')
    .sort('-publishedDate')
    .skip(skip)
    .limit(limit)
    .exec()
    .then(function(posts) {
        cb(null, posts);
      }, function(err) {
        debug('err', err);
        cb(err);
      }
    );
};

module.exports = {
  name: 'blogService',

  read: function(req, resource, params, config, cb) {
    var User = keystone.list('User'),
        where, limit, skip;

    debug('params', params);
    debug('params.title', params.title);
    debug('req.session', req.session);

    // check params.title may be { title: 'undefined' }
    if (params.title && params.title !== 'undefined') {
      where = { title: params.title };
      limit = 1;
      performQuery(where, limit, skip, cb);
    } else if (req.session && req.session.userId) {
      limit = 5;
      User.model.findOne({ _id: req.session.userId }, function (err, user) {
        if (err) throw err;
        if (!user) {
          console.log('no user by that id found! are you spoofing?');
        }
        console.log('mongodb found user by id!');
        performQuery(where, limit, skip, cb);
      });
    } else {
      where = { publishedDate: { $exists: true } };
      limit = 5;
      performQuery(where, limit, skip, cb);
    }
  }
};
