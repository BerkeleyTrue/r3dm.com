var Rx = require('rx'),
    History = require('react-router').HistoryLocation;

var redirectAction = new Rx.Subject();

module.exports = {
  redirectAction: redirectAction,
  History: History
};

redirectAction.subscribeOnNext(function(payload) {
  History.push(payload);
});
