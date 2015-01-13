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
  <Route name = 'connected' path = '/connected' handler = { Connected } />
), (
  <Route name = 'app' path = '/' handler = { App } />
), (
  <Route name = '404' path = '/404' handler = { FourOhFour } />
), (
  <NotFound handler = { FourOhFour } />
), (
  <Route name = 'blog' path = '/blog' handler = { Blog } />
)];

module.exports = routes;
