var React = require('react'),

    // react router
    Router = require('react-router'),
    Route = Router.Route,
    NotFound = Router.NotFoundRoute,
    DefaultRoute = Router.DefaultRoute,
    RouteHandler = Router.RouteHandler,

    // # Components
    Blog = require('./blog'),
    Home = require('./home'),
    FourOhFour = require('./errors/404'),
    Nav = require('./nav'),
    Footer = require('./footer');

var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(RouteHandler, null), 
        React.createElement(Footer, null), 
        React.createElement(Nav, null)
      )
    );
  }
});

var routes = (
  React.createElement(Route, {
    name: "app", 
    path: "/", 
    handler: App }, 

    React.createElement(DefaultRoute, {
      name: "home", 
      handler: Home }), 
    React.createElement(Route, {
      name: "blog", 
      path: "/blog/?:slug?", 
      handler: Blog }), 
    React.createElement(NotFound, {handler: FourOhFour })
  )
);

module.exports = function(Location) {
  return Router.create({
    routes: routes,
    location: Location
  });
};
