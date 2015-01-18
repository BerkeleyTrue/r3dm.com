var Rx = require('rx'),
    rxAction = require('rx-flux').Action,
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:connect:createConnect');

var fetcher = new Fetcher({
  xhrPath: '/api'
});

var action = rxAction.create();
var complete = new Rx.Subject();

action.subscribe(function(payload) {
  debug('Creating email for: ', payload);
  fetcher.create('mandrillService', payload, {}, {}, function(err, data) {
    if (err) {
      return complete.onError(err);
    }
    complete.onNext(data);
  });
});

module.exports = {
  action: action,
  complete: complete
};
