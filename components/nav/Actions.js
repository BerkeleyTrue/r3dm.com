var Action = require('rx-flux').Action,
    debug = require('debug')('r3dm:components:nav:action');

var actions = {
  setLinks: Action.create(),
  loading: Action.create(),
  onError: Action.create()
};

actions.setLinks.subscribe(function(payload) {
  debug('nav action payload: ', payload);
});

module.exports = actions;
