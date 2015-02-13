var React = require('react');

var Banner = React.createClass({displayName: "Banner",

  render: function() {
    return (
      React.createElement("section", {className: "banner"}, 
        React.createElement("img", {src: "images/banner.jpg"})
      )
    );
  }
});

module.exports = Banner;
