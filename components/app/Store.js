var _ = require('lodash'),
    Rx = require('rx'),
    Store = require('rx-flux').Store,

    AppActions = require('./Actions');

var AppStore = Store.create({
  getInitialValue: function() {
    return {
      scrollTop: 0,
      isScrolling: false
    };
  },

  getOperations: function() {
    return Rx.Observable.merge(
      AppActions
        .setScroll
        .map(function(scrollTop) {
          return { scrollTop: scrollTop };
        })
        .map(createTransform),

      AppActions
        .setIsScrolling
        .map(function(isScrolling) {
          return { isScrolling: isScrolling };
        })
        .map(createTransform)
    );
  }
});

module.exports = AppStore;

function createTransform(newState) {
  return {
    transform: function(state) {
      return _.assign({}, state, newState);
    }
  };
}
