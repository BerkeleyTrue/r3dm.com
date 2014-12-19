'use strict';
var Rx = require('rx'),
    Fetcher = require('fetchr'),
    dispatcher = require('../dispatcher'),
    debug = require('debug')('r3dm:connect:createConnect');

var fetcher = new Fetcher({
  xhrPath: '/api'
});

var mandrillAction = new Rx.Subject();

mandrillAction.subscribeOnNext(function(payload) {
  fetcher.create('mandrillService', payload, {}, {}, function(err, data) {
    if (err) { return debug('Error sending email', err); }
    debug('Email Success: ', data);
    dispatcher.redirectAction.onNext('connected');
  });
});

module.exports = mandrillAction;
