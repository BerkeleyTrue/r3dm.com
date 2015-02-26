var Rx = require('rx'),
    assignState = require('../util').assignState,
    Store = require('rx-flux').Store,
    debug = require('debug')('r3dm:components:blog:store'),

    BlogActions = require('./Actions');

var BlogStore = Store.create({

  getInitialValue: function() {
    debug('setting initial value');
    return {
      loading: false,
      error: false,
      posts: []
    };
  },

  getOperations: function() {
    return Rx.Observable.merge(
      BlogActions.setPosts
        .map(function(posts) {
          return {
            loading: false,
            error: false,
            posts: posts && posts.length === 0 ? false : posts
          };
        })
        .map(assignState),

      BlogActions.loading
        .map(function(loading) {
          return {
            loading: loading,
            error: false,
            posts: []
          };
        })
        .map(assignState),

      BlogActions.onError
        .map(function(err) {
          return {
            loading: false,
            error: err,
            posts: []
          };
        })
        .map(assignState)
    );
  }
});

module.exports = BlogStore;
