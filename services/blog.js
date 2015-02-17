var keystone = require('keystone'),
    debug = require('debug')('r3dm:services:blog');

module.exports = {
  name: 'blogService',

  // reads blog posts from the database
  // if the admin is logged in he sees published and unpublished posts
  // else the user only sees published posts
  // also
  // if a slug is provided in the url, a single post is returned
  // else, a list of 5 blog posts are returned
  //
  read: function(req, resource, params, config, cb) {
    var where, limit, skip, userId,
        User = keystone.list('User');
    var slugP = params.slug && params.slug !== 'undefined';

    if (req.session && req.session.userId) {
      userId = req.session.userId;
    } else if (params && params.userId) {
      userId = params.userId;
    }

    debug('slug', params.slug);
    debug('userId', userId);

    if (userId && userId !== 'undefined') {
      User.model.findById(userId, function (err, user) {
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
      where = { slug: params.slug, state: 'published' };
      limit = 1;
      performPostsQuery(where, limit, skip, cb);
    } else {
      where = { state: 'published' };
      limit = 5;
      performPostsQuery(where, limit, skip, cb);
    }
  }
};

/*
 * performs a query on the Post model
 * accepts a `where`, limit size, and skip size
 */
function performPostsQuery(where, limit, skip, cb) {
  var Post = keystone.list('Post');
  debug('where', where);
  debug('reading posts');
  Post
    .model
    .find(where)
    // filter posts with no content
    .where('content').ne(null)
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
