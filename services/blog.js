var keystone = require('keystone'),
    debug = require('debug')('r3dm:services:blog');

module.exports = {
  name: 'blogService',

  /* reads blog posts from the database
   * if the admin is logged in he sees published and unpublished posts
   * else the user only sees published posts
   * also
   * if a slug is provided in the url, a single post is rendered
   * else, a list of 5 blog posts are returned
   */
  read: function(req, resource, params, config, cb) {
    var where, limit, skip,
        User = keystone.list('User');
    var slugP = params.slug && params.slug !== 'undefined';

    debug('params', params);
    debug('params.slug', params.slug);
    debug('req.session', req.session);

    if (req.session && req.session.userId) {
      User.model.findById(req.session.userId, function (err, user) {
        if (err) { return err; }

        if (user) {
          debug('signed in conditional');
          if (slugP) {
            where = { slug: params.slug };
            limit = 1;
            performPostsQuery(where, limit, skip, cb);
          } else {
            limit = 5;
            performPostsQuery(where, limit, skip, cb);
          }
        } else {
          debug('no user by that id found! are you spoofing?');
          cb(new Error('recieved an invalid UserId.'));
        }
      });
    } else if (slugP) {
      where = { slug: params.slug, publishedDate: { $exists: true }};
      limit = 1;
      performPostsQuery(where, limit, skip, cb);
    } else {
      where = { publishedDate: { $exists: true }};
      limit = 5;
      performPostsQuery(where, limit, skip, cb);
    }
  }
};

/*
 * performs a mongoDB query on the Post model
 * accepts a whereClause, limit size, and skip size
 */
function performPostsQuery(whereClause, limit, skip, cb) {
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
}
