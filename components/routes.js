/** @jsx React.DOM */
var App = require('./app.js'),
    React = require('react'),
    Route = require('react-router').Route,
    Connected = require('./connectSuccess'),
    routes = [];

routes.push((
  <Route name = 'app' path = '/' handler = { App } />
));

routes.push((
  <Route name = 'connected' path = '/connected' handler = { Connected } />
));

module.exports = routes;
