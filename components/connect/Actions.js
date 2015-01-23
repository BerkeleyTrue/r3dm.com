var Action = require('rx-flux').Action,
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:connect:createConnect');

var fetcher = new Fetcher({
  xhrPath: '/api'
});

var actions = {
  send: Action.create(),
  sending: Action.create(),
  sent: Action.create(),
  error: Action.create(),
  onEmailChange: Action.create(),
  onNameChange: Action.create()
};

actions.send.subscribe(function(payload) {
  debug('Creating email for: ', payload);
  actions.sending(true);

  fetcher.create('mandrillService', payload, {}, {}, function(err, data) {
    if (err) { return actions.error(err); }

    debug('mandrillService returned without error', data);
    actions.sent(true);
  });
});

module.exports = actions;
