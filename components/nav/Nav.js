var React = require('react'),
    Link = require('react-router').Link,
    debug = require('debug')('r3dm:nav');

var Nav = React.createClass({displayName: "Nav",
  getInitialState: function() {
    var links = [
      { name: 'home', path: '/' },
      { name: 'connect', path: '#connect' },
      { name: 'blog', path: '/blog' }
    ];

    return {
      active: 'home',
      links: links
    };
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
    var links = this.state.links;
    var val = links.map(function(link) {

      if (link.path.indexOf('#') !== -1) {
        return (
          React.createElement("li", null, 
            React.createElement("a", {href:  link.path, target: "_self"}, 
                 link.name
            )
          )
        );
      } else {
        return (
          React.createElement("li", null, 
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
