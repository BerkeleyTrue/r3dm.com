var React = require('react'),
    Link = require('react-router').Link;

var Links = React.createClass({displayName: "Links",

  propTypes: {
    links: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string,
        path: React.PropTypes.string
      })
    )
  },

  render: function() {

    var val = this.props.links.map(function(link) {
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
      React.createElement("ul", {className:  this.props.className}, 
        val 
      )
    );
  }
});
module.exports = Links;
