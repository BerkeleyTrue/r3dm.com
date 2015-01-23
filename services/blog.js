var keystone = require('keystone'),
    debug = require('debug')('r3dm:services:blog');

module.exports = {
  name: 'blogService',
  read: function(req, resource, params, config, cb) {
    var Post = keystone.list('Post'),
        User = keystone.list('User'),
        where, limit, skip;

    debug('params', params);
    debug('params.title', params.title);
    if (params.title && params.title !== 'undefined') {
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
      .populate('author')
      .sort('-publishedDate')
      .skip(skip)
      .limit(limit)
      .exec()
      // .exec(function (err, docs) {
      //   if (err) { return err; }
      //   docs.forEach(function(e) {
      //     if (e.author) {
      //       User.model.findOne({ _id: e.author}, function(err, doc){
      //         e.author = doc.name;
      //         console.log(doc);
      //                         });
      //     } else {
      //       e.author = 'none';
      //     }
      //     console.log('mongoose author', e.author);
      //   });
      // })
      .then(function(posts) {
          cb(null, posts);
        }, function(err) {
          debug('err', err);
          cb(err);
        }
      );
  }
};
