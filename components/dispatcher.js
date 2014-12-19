var Rx = require('rx'),
    HashLocation = require('react-router').HashLocation;

var redirectAction = new Rx.Subject();

module.exports = {
  redirectAction: redirectAction,
  HashLocation: HashLocation
};

redirectAction.subscribeOnNext(function(payload) {
  HashLocation.push(payload);
});
