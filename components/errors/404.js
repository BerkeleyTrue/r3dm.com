var React = require('react'),
    Nav = require('../nav');

var FourOhFour = React.createClass({displayName: "FourOhFour",
  render: function() {
    return (
      React.createElement("div", {className: "error-container"}, 
        React.createElement(Nav, null), 
        React.createElement("div", {className: "pure-g error-layout"}, 
          React.createElement("div", {className: "pure-u-1-3"}), 
          React.createElement("div", {className: "pure-u-1-3"}, 
            React.createElement("h1", null, "404"), 
            React.createElement("h3", {className: "font-bold"}, "Page Not Found"), 
            React.createElement("div", {className: "error-desc"}, 
              "Sorry, this is not the page you are looking for."
            )
          ), 
          React.createElement("div", {className: "pure-u-1-3"})
        )
      )
    );
  }
});
module.exports = FourOhFour;
