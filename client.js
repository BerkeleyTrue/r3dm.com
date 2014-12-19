/* globals  document */
'use strict';
var React = require('react/addons'),
    Router = require('react-router'),
    routes = require('./components/routes'),
    HashLocation = require('./components/dispatcher').HashLocation,
    debug = require('debug')('r3dm:client');

var mountNode = document.getElementById('app');

debug('Matching Route');

Router.run(routes, HashLocation, function(Handler) {
  Handler = React.createFactory(Handler);
  debug('Route found, rendering..');
  React.render(Handler(), mountNode, function() {
    debug('React rendered!');
  });
});
