var rxAction = require('rx-flux').Action,
    BlogStore = require('./blog.store'),
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:blog:action');

var fetcher = new Fetcher({
  xhrPath: '/api'
});

var action = rxAction.create();

action.subscribe(function(payload) {
  debug('blog action: ', payload);
  // serviceName, payload, resource, cb
  fetcher.read('blogService', payload, {}, function(err, posts) {
    if (err) {
      debug('blog err', err);
      return BlogStore.onNext({
        loading: false,
        error: true,
        posts: []
      });
    }
    debug('complete', posts);
    BlogStore.operation.onNext({
      value: {
        loading: false,
        error: false,
        posts: posts
      }
    });
  });
});

module.exports = action;
