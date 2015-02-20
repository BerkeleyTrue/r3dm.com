var Rx = require('rx'),
    rxAction = require('rx-flux').Action,
    HistoryLocation = require('react-router').HistoryLocation;

var action = rxAction.create(),
    complete = new Rx.Subject();

action.subscribe(function(payload) {
  HistoryLocation.push(payload);
  complete.onNext();
});

module.exports = {
  action: action,
  complete: complete,
  HistoryLocation: HistoryLocation
};
