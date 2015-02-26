var Rx = require('rx'),
    Store = require('rx-flux').Store,
    assignState = require('../util/assignState'),
    debug = require('debug')('r3dm:components:nav:store'),

    NavActions = require('./Actions'),
    AppStore = require('../app/Store');


var homeLinks = [
  { name: 'Services', path: '#services' },
  { name: 'Work', path: '#work' },
  { name: 'About', path: '#about' },
  { name: 'Connect', path: '#connect' },
  { name: 'Blog', path: '/blog' }
];

var blogLinks = [
  { name: 'Home', path: '/' }
];

var NavStore = Store.create({

  getInitialValue: function() {
    debug('setting initial value');
    return {
      isScrollingDown: false,
      isSideNavOpen: false,
      showNav: true,
      showNavAtTop: false,
      links: homeLinks.slice()
    };
  },

  getOperations: function() {
    return Rx.Observable.merge(
      NavActions.setLinks
        .map(function(path) {
          debug('path', path);
          if (path.indexOf('/blog') !== -1) {
            return { links: blogLinks.slice() };
          } else {
            return { links: homeLinks.slice() };
          }
        })
        .map(assignState),

      NavActions
        .openSideNav
        .map(function(isOpen) {
          return { isSideNavOpen: isOpen };
        })
        .map(assignState),

      NavActions
        .setShowNav
        .map(function(showNav) {
          return { showNav: showNav };
        })
        .map(assignState),

      NavActions
        .setShowNavAtTop
        .map(function(showNavAtTop) {
          return { showNavAtTop: showNavAtTop };
        })
        .map(assignState),

      AppStore
        .map(function(AppState) {
          return {
            isScrollingDown: AppState.isScrollingDown,
            scrollTop: AppState.scrollTop
          };
        })
        .map(assignState)
    );
  }
});

module.exports = NavStore;
