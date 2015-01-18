var Rx = require('rx'),
    Store = require('rx-flux').Store,
    operation = new Rx.Subject();

var ContextStore = Store.create({
  getInitialValue: function() {
    return {};
  },

  getOperations: function() {
    return operation;
  }
});

ContextStore.operation = operation;

module.exports = ContextStore;
