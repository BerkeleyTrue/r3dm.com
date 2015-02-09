var createActions = require('../util/createActions'),
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:components:blog:action');

var fetcher = new Fetcher({
  xhrPath: '/api'
});

var actions = createActions([
  'setSlug',
  'setPosts',
  'loading',
  'onError'
]);

actions.setSlug.subscribe(function(payload) {
  debug('blog action payload: ', payload);
  actions.loading(true);
  fetcher.read('blogService', payload, {}, function(err, posts) {
    if (err) {
      debug('blog err', err);
      return actions.onError(true);
    }
    debug('calling set posts with %s posts', posts.length);
    actions.setPosts(posts);
  });
});

module.exports = actions;
