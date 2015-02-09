var createActions = require('../util/createActions'),
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:connect:createConnect');

var fetcher = new Fetcher({
  xhrPath: '/api'
});

var actions = createActions([
  'send',
  'sending',
  'sent',
  'error',
  'onEmailChange',
  'onNameChange',
  'setUtc'
]);

actions.send.subscribe(function(payload) {
  debug('Creating email for: ', payload);
  actions.sending(true);
  if (process.env.NODE_ENV === 'development') {
    debug('debug mode');
    return setTimeout(function() {
      actions.sent(true);
    }, 500);
  }
  fetcher.create('connect', payload, {}, {}, function(err, data) {
    if (err) { return actions.error(err); }

    debug('connect service returned without error', data);
    actions.sent(true);
  });
});

module.exports = actions;
