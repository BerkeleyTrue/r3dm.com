var React = require('react/addons'),
    RouteHandler = require('react-router').RouteHandler,

    // # mixins
    StateStreamMixin = require('../util/stateStreamMixin'),
    ScrollMixin = require('../util/scrollMixin'),

    // # flux
    AppActions = require('./Actions'),
    AppStore = require('./Store'),

    // # components
    Nav = require('../nav'),
    SideNav = require('../nav/SideNav.jsx'),
    Footer = require('../footer');

var App = React.createClass({

  mixins: [
    ScrollMixin,
    StateStreamMixin
  ],

  getStateStream: function() {
    return AppStore;
  },

  setScroll: AppActions.setScroll,
  setIsScrolling: AppActions.setIsScrolling,

  render: function() {
    return (
      <div>
        <RouteHandler />
        <Footer />
        <Nav />
        <SideNav />
      </div>
    );
  }
});

module.exports = App;
