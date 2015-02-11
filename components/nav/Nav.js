var React = require('react/addons'),

    // tweenState = require('react-tween-state'),
    Router = require('react-router'),
    Link = Router.Link,

    StateStreamMixin = require('../util/stateStreamMixin'),

    NavStore = require('./Store.js'),
    debug = require('debug')('r3dm:nav');

var Nav = React.createClass({displayName: "Nav",
  mixins: [
    // tweenState.Mixin,
    StateStreamMixin
  ],

  getStateStream: function() {
    return NavStore;
  },

  render: function() {
    var state = this.state;
    var scrollTop = state.scrollTop;
    var top = state.windowHeight - scrollTop * 1.6;
    var opacity = scrollTop / state.windowHeight;
    var navStyle = {
      opacity: opacity > 1 ? 1 : opacity,
      top: top < 0 ? 0 : top
    };
    var links = this.state.links;

    var val = links.map(function(link) {

      if (link.path.indexOf('#') !== -1) {
        return (
          React.createElement("li", {key:  link.path}, 
            React.createElement("a", {href:  link.path, target: "_self"}, 
                 link.name
            )
          )
        );
      } else {
        return (
          React.createElement("li", {key:  link.path}, 
            React.createElement(Link, {to:  link.path},  link.name)
          )
        );
      }
    });

    return (
      React.createElement("nav", {className: "nav", style: navStyle }, 
        React.createElement("ul", {className: "nav-pullRight"}, 
          val 
        )
      )
    );
  }
});

module.exports = Nav;
