var keystone = require('keystone'),
    debug = require('debug')('r3dm:services:blog');

module.exports = {
  name: 'blogService',
  read: function(req, resource, params, config, cb) {
    var Post = keystone.list('Post'),
        where, limit, skip;

    debug('params', params);
    debug('params.title', params.title);
    if (params.title) {
      where = { title: params.title };
      limit = 1;
    } else {
      limit = 5;
    }

    debug('where', where);
    debug('reading posts');
    Post
      .model
      .find(where)
      .sort('-publishedDate')
      .skip(skip)
      .limit(limit)
      .exec()
      .then(function(posts) {
        cb(null, posts);
      }, function(err) {
        debug('err', err);
        cb(err);
      });
  }
};
