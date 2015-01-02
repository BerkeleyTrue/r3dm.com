var Rx = require('rx'),
    rxAction = require('rx-flux').Action,
    routerHistory = require('react-router').HistoryLocation;

var action = rxAction.create(),
    complete = new Rx.Subject();

action.subscribe(function(payload) {
  routerHistory.push(payload);
  complete.onNext();
});

module.exports = {
  action: action,
  complete: complete,
  routerHistory: routerHistory
};

