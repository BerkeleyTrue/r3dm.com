/** @jsx React.DOM */
var App = require('./app.js'),
    React = require('react'),
    Route = require('react-router').Route,
    Connected = require('./connectSuccess'),
    fourOhFour = require('./errors/404'),
    routes;


routes = [(
  <Route name = 'connected' path = '/connected' handler = { Connected } />
), (
  <Route name = 'app' path = '/' handler = { App } />
), (
  <Route name = '404' path = '/404' handler = { fourOhFour } />
)];

module.exports = routes;
