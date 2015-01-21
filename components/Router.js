var React = require('react'),

    // # React Router
    Router = require('react-router'),
    Route = Router.Route,
    NotFound = Router.NotFoundRoute,

    // # Components
    Blog = require('./blog'),
    Landing = require('./landing'),
    Connected = require('./connectSuccess'),
    FourOhFour = require('./errors/404');

// Routes here is an array as each component is it's own app
// This should be changed so we have a top level app where the nav
// bar is hosted, and the sub-apps, like blog and landing, should render
// into.

var routes = [
  (React.createElement(Route, {name: "landing", path: "/", handler: Landing })),
  (React.createElement(Route, {name: "connected", path: "/connected", handler: Connected })),
  (React.createElement(Route, {name: "blog", path: "/blog/?:title?", handler: Blog })),
  (React.createElement(Route, {name: "404", path: "/404", handler: FourOhFour })),
  (React.createElement(NotFound, {handler: FourOhFour }))
];

module.exports = function(Location) {
  return Router.create({
    routes: routes,
    location: Location
  });
};
