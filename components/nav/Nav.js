var React = require('react'),
    Link = require('react-router').Link,
    debug = require('debug')('r3dm:nav');

var Nav = React.createClass({displayName: "Nav",
  getInitialState: function() {
    var links = {
      home: '/'
    };

    return {
      selected: 'home',
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
    return (
      React.createElement("nav", {className: "nav"}, 
        React.createElement("ul", {className: "nav-pullRight"}, 
          React.createElement("li", null, 
            React.createElement("a", {
              name: "connect", 
              onClick:  this.handleHashLink}, 
              "Connect"
            )
          ), 
          React.createElement("li", null, 
            React.createElement(Link, {to: "blog"}, 
              "Blog"
            )
          )
        )
      )
    );
  }
});

module.exports = Nav;
