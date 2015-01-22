var Rx = require('rx'),
    Store = require('rx-flux').Store,
    debug = require('r3dm:component:connect:store');

// operations are the action observable that updates the store
// Perhaps this should just be named 'action'
// or have connect action file export an observable a second observable;
var operation = new Rx.Subject();

var ConnectStore = Store.create({

  getInitialValue: function() {
    debug('init');
    return {
      sending: false,
      sent: false,
      error: false
    };
  },

  getOperations: function() {
    return operation;
  }
});

ConnectStore.operation = operation;

module.exports = ConnectStore;
