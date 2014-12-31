var React = require('react');

var Banner = React.createClass({displayName: "Banner",

  render: function() {
    return (
      React.createElement("div", {className: "banner"}, 
        React.createElement("h1", null, "We Are The R3DM.")
      )
    );
  }
});

module.exports = Banner;
