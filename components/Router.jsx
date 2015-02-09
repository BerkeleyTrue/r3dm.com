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

var App = React.createClass({
  render: function() {
    return (
      <div>
        <RouteHandler />
        <Footer />
        <Nav />
      </div>
    );
  }
});

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
