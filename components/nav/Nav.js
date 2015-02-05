var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    StateStreamMixin = Router.StateStreamMixin,
    NavStore = require('./Store.js'),
    RouterState = Router.State,
    debug = require('debug')('r3dm:nav');

var Nav = React.createClass({displayName: "Nav",
  mixins: [
    StateStreamMixin,
    RouterState
  ],

  getStateStream: function() {
    return NavStore;
  },

  componentDidMount: function() {
  },

  handleHashLink: function(e) {
    debug('Handle link', e.target.id);
    var hash = e.target.name;
    e.preventDefault();
    window.location.hash = '';
    window.location.hash = hash;
  },

  render: function() {
    debug('navbar state', this.state);
    var links = this.state.links;
    var pathname = this.getPathname();

    var val = links.map(function(link) {
      var classNameActive = link.path === pathname ? 'active' : '';

      if (link.path.indexOf('#') !== -1) {
        return (
          React.createElement("li", {key:  link.path, className: classNameActive}, 
            React.createElement("a", {href:  link.path, target: "_self"}, 
                 link.name
            )
          )
        );
      } else {
        return (
          React.createElement("li", {key:  link.path, className: classNameActive}, 
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
