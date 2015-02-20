var React = require('react');

var ComingSoon = React.createClass({displayName: "ComingSoon",

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    return (
      React.createElement("section", {className: "notFound"}, 
        React.createElement("div", {className: "notFound_layout"}, 
          React.createElement("div", {className: "notFound_main"}, 
            React.createElement("header", null, 
              React.createElement("h1", null, "Coming Soon..")
            ), 
            React.createElement("div", {className: "notFound_desc"}, 
              "Sorry, this is not the blog you are looking for..."
            )
          )
        )
      )
    );
  }
});
module.exports = ComingSoon;
