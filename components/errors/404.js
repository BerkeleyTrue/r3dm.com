var React = require('react');

var FourOhFour = React.createClass({displayName: "FourOhFour",

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    return (
      React.createElement("section", {className: "error-container"}, 
        React.createElement("div", {className: "pure-g error-layout"}, 
          React.createElement("div", {className: "pure-u-1-3"}), 
          React.createElement("div", {className: "pure-u-1-3"}, 
            React.createElement("header", null, 
              React.createElement("h1", null, "404"), 
              React.createElement("p", {className: "font-bold"}, "Page Not Found")
            ), 
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
