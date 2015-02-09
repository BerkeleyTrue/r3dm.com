var React = require('react'),

    Router = require('react-router'),
    Link = Router.Link,

    StateStreamMixin = require('../util/stateStreamMixin'),

    NavStore = require('./Store.js'),
    debug = require('debug')('r3dm:nav');

var Nav = React.createClass({displayName: "Nav",
  mixins: [StateStreamMixin],

  getStateStream: function() {
    return NavStore;
  },

  handleHashLink: function(e) {
    debug('Handle link', e.target.id);
    var hash = e.target.name;
    e.preventDefault();
    window.location.hash = '';
    window.location.hash = hash;
  },

  render: function() {
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
      React.createElement("nav", {className: "nav"}, 
        React.createElement("ul", {className: "nav-pullRight"}, 
          val 
        )
      )
    );
  }
});

module.exports = Nav;
