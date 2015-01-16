var Rx = require('rx'),
    rxAction = require('rx-flux').Action,
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:blog:action');

var fetcher = new Fetcher({
  xhrPath: '/api'
});

var action = rxAction.create();
var complete = new Rx.Subject();

action.subscribe(function(payload) {
  debug('blog action: ', payload);
  // serviceName, payload, resource, cb
  fetcher.read('blogService', payload, {}, function(err, data) {
    if (err) {
      return debug('blog err', err);
    }
    debug('complete', data);
  });
});

module.exports = {
  action: action,
  complete: complete
};
