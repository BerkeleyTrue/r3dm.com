'use strict';
var React = require('react/addons'),
    Router = require('react-router'),
    routes = require('./components/routes'),
    routerHistory = require('./components/common/history.action').routerHistory,
    fetchData = require('./fetchData'),
    debug = require('debug')('r3dm:client');

var mountNode = document.getElementById('app');

debug('Matching Route');

Router.run(routes, routerHistory, function(Handler, state) {
  debug('Route found, %s rendering..', state.path);
  Handler = React.createFactory(Handler);
  fetchData(state)
    .then(function(context) {
      debug('Got context', context);
      React.render(Handler({ context: context }), mountNode, function() {
        debug('React rendered!');
      });
    });
});
