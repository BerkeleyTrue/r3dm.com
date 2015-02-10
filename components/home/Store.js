var _ = require('lodash'),
    Rx = require('rx'),

    Store = require('rx-flux').Store,
    HomeActions = require('./Actions');

var HomeStore = Store.create({
  getInitialValue: function() {
    return {
      scrollTop: 0,
      isScrolling: false
    };
  },

  getOperations: function() {
    return Rx.Observable.merge(
      HomeActions
        .setScroll
        .map(function(scrollTop) {
          return { scrollTop: scrollTop };
        })
        .map(createTransform),
      HomeActions
        .setIsScrolling
        .map(function(isScrolling) {
          return { isScrolling: isScrolling };
        })
        .map(createTransform)
    );
  }
});

function createTransform(newState) {
  return {
    transform: function(state) {
      return _.assign({}, state, newState);
    }
  };
}

module.exports = HomeStore;
