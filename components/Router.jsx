/* eslint no-unused-vars: 0 */
var React = require('react'),

    // react router
    Router = require('react-router'),
    Route = Router.Route,
    NotFound = Router.NotFoundRoute,
    DefaultRoute = Router.DefaultRoute,

    // # Components
    App = require('./app'),
    Blog = require('./blog'),
    Home = require('./home'),
    FourOhFour = require('./errors/404.jsx');

var routes = (
  <Route
    name='app'
    path='/'
    handler={ App }>

    <DefaultRoute
      name='home'
      handler={ Home } />
    <Route
      name='blog'
      path='/blog/?:slug?'
      handler={ Blog } />
    <NotFound handler={ FourOhFour } />
  </Route>
);

module.exports = function(Location) {
  return Router.create({
    routes: routes,
    location: Location
  });
};
