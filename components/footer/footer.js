var React = require('react');
/*
 * Footer
 */
var Footer = React.createClass({displayName: 'Footer',
  render: function() {
    return  (
        React.createElement("div", {id: "footer"}, 
            "Copyright © 2014 R3DM LLC"
        )
    );
  }
});

module.exports = Footer;
