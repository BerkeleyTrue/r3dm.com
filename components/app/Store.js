var _ = require('lodash'),
    Rx = require('rx'),
    Store = require('rx-flux').Store,
    assignState = require('../util').assignState,

    AppActions = require('./Actions');

var AppStore = Store.create({
  getInitialValue: function() {
    return {
      scrollTop: 0,
      isScrolling: false,
      isScrollingDown: true
    };
  },

  getOperations: function() {
    return Rx.Observable.merge(
      AppActions
        .setScroll
        .map(function(scrollTop) {
          return {
            transform: function(oldState) {
              var newState = { scrollTop: scrollTop };
              // is scrolling down
              if (oldState.scrollTop < scrollTop) {
                newState.isScrollingDown = true;
              } else {
                newState.isScrollingDown = false;
              }
              return _.assign({}, oldState, newState);
            }
          };
        }),

      AppActions
        .setIsScrolling
        .map(function(isScrolling) {
          return { isScrolling: isScrolling };
        })
        .map(assignState)
    );
  }
});

module.exports = AppStore;
