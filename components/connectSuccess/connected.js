var React = require('react');

var ClassName = React.createClass({displayName: "ClassName",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Thanks!"), 
        React.createElement("p", null, "You should see an email from us soon.")
      )
    );
  }
});
module.exports = ClassName;
