var _ = require('lodash'),
    Rx = require('rx'),
    Store = require('rx-flux').Store,
    debug = require('debug')('r3dm:components:nav:store'),

    NavActions = require('./Actions');

var NavStore = Store.create({

  getInitialValue: function() {
    debug('setting initial value');
    return {
      loading: false,
      error: false,
      links: [
        { name: 'Home', path: '/' },
        { name: 'Connect', path: '#connect' },
        { name: 'Blog', path: '/blog' }
      ]
    };
  },

  getOperations: function() {
    return Rx.Observable.merge(
      NavActions.setLinks
        .map(function(links) {
          return {
            loading: false,
            error: false,
            links: links
          };
        })
        .map(createTransform),

      NavActions.loading
        .map(function(loading) {
          return {
            loading: loading,
            error: false,
            links: []
          };
        })
        .map(createTransform),

      NavActions.onError
        .map(function(err) {
          return {
            loading: false,
            error: err,
            links: []
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

module.exports = NavStore;
