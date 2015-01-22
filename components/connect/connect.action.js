var Action = require('rx-flux').Action,
    ConnectStore = require('./connect.store'),
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:connect:createConnect');

var fetcher = new Fetcher({
  xhrPath: '/api'
});

var action = Action.create();

action.subscribe(function(payload) {
  debug('Creating email for: ', payload);
  ConnectStore.operation.onNext({
    value: {
      sending: true,
      sent: true,
      error: false
    }
  });
  fetcher.create('mandrillService', payload, {}, {}, function(err, data) {
    if (err) {
      ConnectStore.operation.onNext({
        value: {
          sending: false,
          sent: false,
          error: true,
        }
      });
    }
    debug('mandrillService returned without error', data);
    ConnectStore.operation.onNext({
      value: {
        sending: false,
        sent: true,
        error: false
      }
    });
  });
});

module.exports = action;
