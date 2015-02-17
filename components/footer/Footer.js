var React = require('react');

var Footer = React.createClass({displayName: "Footer",

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    return (
      React.createElement("footer", {id: "footer"}, 
        "Copyright © 2015 R3DM LLC"
      )
    );
  }
});

module.exports = Footer;
