var App = require('./app.js'),
    React = require('react'),

    // # Router
    Router = require('react-router'),
    Route = Router.Route,
    NotFound = Router.NotFoundRoute,

    // # Components
    Connected = require('./connectSuccess'),
    fourOhFour = require('./errors/404'),
    routes;


routes = [(
  React.createElement(Route, {name: "connected", path: "/connected", handler: Connected })
), (
  React.createElement(Route, {name: "app", path: "/", handler: App })
), (
  React.createElement(Route, {name: "404", path: "/404", handler: fourOhFour })
), (
  React.createElement(NotFound, {handler: fourOhFour })
)];

module.exports = routes;
