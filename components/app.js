/** @jsx React.DOM */
'use strict';
var React = require('react/addons'),

    // # Router
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Route = Router.Route,

    // # Components
    Banner = require('./banner'),
    Connected = require('./connectSuccess'),
    Logo = require('./logo'),
    Connect = require('./connect');

var Index = React.createClass({
  render: function() {

    return (
      <div className="main-app">
        <div className="logo-container">
          <Logo></Logo>
        </div>
        <div className="first-con">
          <Banner></Banner>
          <div className="first-con_bot">
            <h2>
              We build fast, data-rich, offline capable websites that bring
              the future to your users.
            </h2>
          </div>
        </div>
        <Connect></Connect>
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <RouteHandler />
    );
  }
});

module.exports = App;

var routes = (
  <Route
    name = 'app'
    path = '/'
    handler = { App }>
    <Route
      name = 'index'
      path = '/'
      handler = { Index } />
    <Route
      name = 'connected'
      path = '/connected'
      handler = { Connected } />
  </Route>
);

module.exports = routes;
