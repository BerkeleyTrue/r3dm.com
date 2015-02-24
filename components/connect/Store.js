var Rx = require('rx'),
    Store = require('rx-flux').Store,
    assignState = require('../util').assignState,
    debug = require('debug')('r3dm:component:connect:store'),

    ConnectActions = require('./Actions');

// operations are the action observable that updates the store
// Perhaps this should just be named 'action'
// or have connect action file export an observable a second observable;
var operation = new Rx.Subject();

var ConnectStore = Store.create({

  getInitialValue: function() {
    debug('init');
    return {
      email: '',
      name: '',
      utc: '',
      sending: false,
      sent: false,
      error: false
    };
  },

  getOperations: function() {
    debug('setting up operations');
    return Rx.Observable.merge(

      ConnectActions.sending
        .map(function(sending) {
          return {
            sending: sending,
            sent: false,
            error: false
          };
        })
        .map(assignState),

      ConnectActions.sent
        .map(function(sent) {
          return {
            sending: false,
            sent: sent,
            error: false
          };
        })
        .map(assignState),

      ConnectActions.error
        .map(function(err) {
          debug('An error occured durring mandrill service', err);
          return {
            sending: false,
            sent: false,
            error: true
          };
        })
        .map(assignState),

      ConnectActions.onEmailChange
        .map(mapEventValue)
        .map(function(email) {
          return { email: email };
        })
        .map(assignState),

      ConnectActions.onNameChange
        .map(mapEventValue)
        .map(function(name) {
          return { name: name };
        })
        .map(assignState),

      ConnectActions.setUtc
        .map(function(utc) {
          return { utc: utc };
        })
        .map(assignState)
    );

    function mapEventValue(e) {
      return e.target ? e.target.value : '';
    }
  }
});

ConnectStore.operation = operation;

module.exports = ConnectStore;
