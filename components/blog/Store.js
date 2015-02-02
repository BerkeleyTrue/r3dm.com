var _ = require('lodash'),
    Rx = require('rx'),
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
        .map(createTransform),

      BlogActions.loading
        .map(function(loading) {
          return {
            loading: loading,
            error: false,
            posts: []
          };
        })
        .map(createTransform),

      BlogActions.onError
        .map(function(err) {
          return {
            loading: false,
            error: err,
            posts: []
          };
        })
        .map(createTransform)
    );

    function createTransform(newState) {
      return {
        transform: function(state) {
          return _.assign({}, state, newState);
        }
      };
    }
  }
});

module.exports = BlogStore;
