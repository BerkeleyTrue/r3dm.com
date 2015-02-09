var _ = require('lodash'),
    Store = require('rx-flux').Store,
    debug = require('debug')('r3dm:components:nav:store'),

    NavActions = require('./Actions');

var NavStore = Store.create({

  getInitialValue: function() {
    debug('setting initial value');
    return {
      links: [
        { name: 'Connect', path: '#connect' },
        { name: 'Blog', path: '/blog' }
      ]
    };
  },

  getOperations: function() {
    return NavActions.setLinks
      .map(function(path) {
        debug('path', path);
        if (path.indexOf('/blog') !== -1) {
          return {
            links: [
              { name: 'Home', path: '/' }
            ]
          };
        } else {
          return {
            links: [
              { name: 'Connect', path: '#connect' },
              { name: 'Blog', path: '/blog' }
            ]
          };
        }
      })
      .map(createTransform);

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
