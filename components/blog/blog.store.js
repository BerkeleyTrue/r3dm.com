var Rx = require('rx'),
    Store = require('rx-flux').Store,
    debug = require('debug')('r3dm:blog:store'),
    operation = new Rx.Subject();

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
    return operation;
  }
});

BlogStore.operation = operation;

module.exports = BlogStore;
