var keystone = require('keystone'),
    moment = require('moment');

module.exports = function generateSitemap(app) {
  var Post = keystone.list('Post');

  app.get('/sitemap.xml', function(req, res, next) {
    var now = moment().format('YYYY-MM-DD'),
        siteUrl = 'http://www.r3dm.com';

    Post
      .model
      .find()
      .where({ state: 'published' })
      .where('content').ne(null)
      .select('slug')
      .exec()
      .then(function(posts) {
        res.header('Content-Type', 'application/xml');
        res.render('sitemap', {
          now: now,
          siteUrl: siteUrl,
          posts: posts
        });
      }, next);
  });
};
