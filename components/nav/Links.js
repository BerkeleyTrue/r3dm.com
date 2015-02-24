var React = require('react/addons'),
    Router = require('react-router'),
    cx = React.addons.classSet,

    PureRenderMixin = React.addons.PureRenderMixin,

    Link = Router.Link;

var Links = React.createClass({displayName: "Links",
  mixins: [PureRenderMixin],

  propTypes: {
    hash: React.PropTypes.string,
    links: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string,
        path: React.PropTypes.string
      })
    )
  },

  getInitialState: function() {
    return {
      hash: ''
    };
  },

  render: function() {
    var hash = this.props.hash;
    var val = this.props.links.map(function(link) {
      if (link.path.indexOf('#') !== -1) {
        var underLineClass = cx({
          'nav_underline': true,
          'active': link.path.indexOf(hash) !== -1
        });
        return (
          React.createElement("li", {key:  link.path}, 
            React.createElement("a", {href:  link.path, target: "_self"}, 
               link.name
            ), 
            React.createElement("div", {className: underLineClass })
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
