var keystone = require('keystone'),
    debug = require('debug')('r3dm:services:blog');

module.exports = {
  name: 'blogService',
  read: function(req, resource, params, config, cb) {
    var Post = keystone.list('Post');
    debug('reading posts');

    Post
      .model
      .find()
      .sort('-publishedDate')
      .limit(5)
      .exec()
      .then(function(posts) {
        cb(null, posts);
      }, function(err) {
        debug('err', err);
        cb(err);
      });
  }
};
