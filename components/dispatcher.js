var Rx = require('rx'),
    History = require('react-router').HistoryLocation,
    mandrillAction = require('./connect/connect.action');

var redirectAction = new Rx.Subject();

module.exports = {
  redirectAction: redirectAction,
  mandrillAction: mandrillAction,
  History: History
};

redirectAction.subscribeOnNext(function(payload) {
  History.push(payload);
});
