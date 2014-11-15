'use strict';
var Rx = require('rx'),
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:connect:createConnect');

var _fetcher = new Fetcher({
  xhrPath: '/api'
});

var mandrillAction = new Rx.Subject();

mandrillAction.subscribeOnNext(function(payload) {
  _fetcher.create('mandrillService', payload, {}, {}, function(err, data) {
    if (err) {
      return debug('Error sending email', err);
    } else {
      debug(data);
    }
  });
});

module.exports = mandrillAction;
