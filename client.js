/* globals  document */
'use strict';
var React = require('react/addons'),
    Router = require('react-router'),
    routes = require('./components/routes'),
    History = require('./components/dispatcher').History,
    debug = require('debug')('r3dm:client');

var mountNode = document.getElementById('app');

debug('Matching Route');

Router.run(routes, History, function(Handler, state) {
  Handler = React.createFactory(Handler);
  debug('Route found, %s rendering..', state.path);
  React.render(Handler(), mountNode, function() {
    debug('React rendered!');
  });
});
