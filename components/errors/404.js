var React = require('react');

var FourOhFour = React.createClass({displayName: 'FourOhFour',
  render: function() {
    return (
      React.createElement("div", {className: "middle-box text-center animated fadeInDown"}, 
        React.createElement("h1", null, "404"), 
        React.createElement("h3", {className: "font-bold"}, "Page Not Found"), 
        React.createElement("div", {className: "error-desc"}, 
          "Sorry, this is not the page you are looking for."
        )
      )
    );
  }
});
module.exports = FourOhFour;
