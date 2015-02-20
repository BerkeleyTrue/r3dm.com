var React = require('react');

var FourOhFour = React.createClass({displayName: "FourOhFour",

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    return (
      React.createElement("section", {className: "notFound"}, 
        React.createElement("div", {className: "notFound_layout"}, 
          React.createElement("div", {className: "notFound_main"}, 
            React.createElement("header", null, 
              React.createElement("h1", null, "404"), 
              React.createElement("p", null, "Page Not Found")
            ), 
            React.createElement("div", {className: "notFound_desc"}, 
              "Sorry, this is not the page you are looking for."
            )
          )
        )
      )
    );
  }
});
module.exports = FourOhFour;
