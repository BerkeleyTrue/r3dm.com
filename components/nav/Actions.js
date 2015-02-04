var Action = require('rx-flux').Action,
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:components:nav:action');

var fetcher = new Fetcher({
  xhrPath: '/api'
});

var actions = {
  setLinks: Action.create(),
  setActive: Action.create(),
  loading: Action.create(),
  onError: Action.create()
};

actions.setLinks.subscribe(function(payload) {
  debug('nav action payload: ', payload);
  actions.loading(true);
  var links = [];
  actions.setActive(links);
});

module.exports = actions;
