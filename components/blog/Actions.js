var rxAction = require('rx-flux').Action,
    BlogStore = require('./Store'),
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:components:blog:action');

var fetcher = new Fetcher({
  xhrPath: '/api'
});

var action = rxAction.create();

action.subscribe(function(payload) {
  debug('blog action payload: ', payload);
  BlogStore.operation.onNext({
    value: {
      loading: true,
      error: false,
      posts: []
    }
  });
  fetcher.read('blogService', payload, {}, function(err, posts) {
    if (err) {
      debug('blog err', err);
      return BlogStore.operation.onNext({
        value: {
          loading: false,
          error: true,
          posts: []
        }
      });
    }
    debug('complete');
    debug('number of posts', posts && posts.length);
    BlogStore.operation.onNext({
      value: {
        loading: false,
        error: false,
        posts: posts.length === 0 ? false : posts
      }
    });
  });
});

module.exports = action;
