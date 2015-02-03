var Action = require('rx-flux').Action,
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:components:blog:action');

var fetcher = new Fetcher({
  xhrPath: '/api'
});

var actions = {
  setSlug: Action.create(),
  setPosts: Action.create(),
  loading: Action.create(),
  onError: Action.create()
};

actions.setSlug.subscribe(function(payload) {
  debug('blog action payload: ', payload);
  actions.loading(true);
  fetcher.read('blogService', payload, {}, function(err, posts) {
    if (err) {
      debug('blog err', err);
      return actions.onError(true);
    }
    debug('complete');
    debug('number of posts', posts && posts.length);
    actions.setPosts(posts);
  });
});

module.exports = actions;
