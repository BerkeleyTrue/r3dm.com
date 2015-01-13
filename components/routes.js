var App = require('./app.js'),
    React = require('react'),

    // # Router
    Router = require('react-router'),
    Route = Router.Route,
    NotFound = Router.NotFoundRoute,

    // # Components
    Connected = require('./connectSuccess'),
    FourOhFour = require('./errors/404'),
    Blog = require('./blog/blog'),
    routes;


routes = [(
  React.createElement(Route, {name: "connected", path: "/connected", handler: Connected })
), (
  React.createElement(Route, {name: "app", path: "/", handler: App })
), (
  React.createElement(Route, {name: "404", path: "/404", handler: FourOhFour })
), (
  React.createElement(NotFound, {handler: FourOhFour })
), (
  React.createElement(Route, {name: "blog", path: "/blog", handler: Blog })
)];

module.exports = routes;
