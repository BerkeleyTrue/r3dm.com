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
    Footer = require('../footer');

var App = React.createClass({displayName: "App",

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
      React.createElement("div", null, 
        React.createElement(RouteHandler, null), 
        React.createElement(Footer, null), 
        React.createElement(Nav, null)
      )
    );
  }
});

module.exports = App;
