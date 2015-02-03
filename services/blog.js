var keystone = require('keystone'),
    debug = require('debug')('r3dm:services:blog');

/*
 * performs a mongoDB query on the Post model
 * accepts a whereClause, limit size, and skip size
 */
var performPostsQuery = function(whereClause, limit, skip, cb) {
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

/* verifies the user is logged in
 */
var verifySessionByUserId = function(userId) {
  var User = keystone.list('Post');

  User.model.findOne({ _id: userId }, function (err, user) {
    if (err) { return cb(err); }

    if (!user) {
      debug('no user by that id found! are you spoofing?');
      where = { publishedDate: { $exists: true }};
      performPostsQuery(where, limit, skip, cb);
    } else {
      debug('mongodb found user by id!');
      performPostsQuery(where, limit, skip, cb);
    }
  });
}

module.exports = {
  name: 'blogService',

  /* reads blog posts for the database
   * if the user is logged in he sees published and unpublished posts
   * else the user only sees published posts
   * also
   * if a slug is provided in the url a single post is rendered
   */
  read: function(req, resource, params, config, cb) {
    var where, limit, skip,
        slugP, signedIn;

    debug('params', params);
    debug('params.slug', params.slug);
    debug('req.session', req.session);

    if (req.session && req.session.userId) {
      signedIn = verifySessionByUserId(req.session.userId);
    } else {
      signedIn = false;
    }

    slugP = params.slug && params.slug !== 'undefined';

    if (signedIn) {
      debug('signed in conditional');
      if (slugP) {
        where = { slug: params.slug };
        limit = 1;
        performPostsQuery(where, limit, skip, cb);
      } else {
        limit = 5;
        performPostsQuery(where, limit, skip, cb);
      }
    } else if (slugP) {
      debug('slugP in conditional');
      where = { slug: params.slug, publishedDate: { $exists: true } };
      limit = 1;
      performPostsQuery(where, limit, skip, cb);
    } else {
      debug('else conditional');
      where = { publishedDate: { $exists: true } };
      limit = 5;
      performPostsQuery(where, limit, skip, cb);
    }
  }
};
