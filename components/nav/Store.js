var _ = require('lodash'),
    Rx = require('rx'),
    Store = require('rx-flux').Store,
    debug = require('debug')('r3dm:components:nav:store'),

    NavActions = require('./Actions'),
    HomeActions = require('../home/Actions');

var NavStore = Store.create({

  getInitialValue: function() {
    debug('setting initial value');
    return {
      scrollTop: 0,
      windowHeight: 0,
      links: [
        { name: 'Connect', path: '#connect' },
        { name: 'Blog', path: '/blog' }
      ]
    };
  },

  getOperations: function() {
    return Rx.Observable.merge(
      NavActions.setLinks
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
        .map(createTransform),

      HomeActions
        .setScroll
        .map(function(scrollTop) {
          return { scrollTop: scrollTop };
        })
        .map(createTransform),

      HomeActions
        .setWindowHeight
        .map(function(height) {
          return { windowHeight: height };
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
