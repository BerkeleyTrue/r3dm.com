var _ = require('lodash'),
    Rx = require('rx'),
    Store = require('rx-flux').Store,
    debug = require('debug')('r3dm:components:nav:store'),

    NavActions = require('./Actions'),
    AppStore = require('../app/Store');

var NavStore = Store.create({

  getInitialValue: function() {
    debug('setting initial value');
    return {
      isScrollingDown: false,
      isSideNavOpen: false,
      showNav: true,
      showNavAtTop: false,
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

      NavActions
        .openSideNav
        .map(function(isOpen) {
          return { isSideNavOpen: isOpen };
        })
        .map(createTransform),

      NavActions
        .setShowNav
        .map(function(showNav) {
          return { showNav: showNav };
        })
        .map(createTransform),

      NavActions
        .setShowNavAtTop
        .map(function(showNavAtTop) {
          return { showNavAtTop: showNavAtTop };
        })
        .map(createTransform),

      AppStore
        .map(function(AppState) {
          return {
            isScrollingDown: AppState.isScrollingDown,
            scrollTop: AppState.scrollTop
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
