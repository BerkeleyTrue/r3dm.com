var React = require('react');

var About = React.createClass({displayName: "About",
  render: function() {
    return (
      React.createElement("section", {
        id: "about", 
        className: "about"}, 
        React.createElement("div", {className: "about_content"}, 
          React.createElement("header", null, 
            React.createElement("h2", null, "About R3DM")
          ), 
          React.createElement("p", null, 
            "We are a group of developers and designers who are looking for" + ' ' +
            "exciting new ideas to build and express our creativity. We build" + ' ' +
            "using Node.js and the latest technologies to deliver a fast and" + ' ' +
            "beautiful experience to users.", 
            React.createElement("br", null), 
            React.createElement("br", null), 
            "Need an MVP? Need an API that can scale to enterprise level? Want" + ' ' +
            "to use the latest in React.js tech? Reach out and" + ' ' +
            "lets build something together!"
          )
        )
      )
    );
  }
});

module.exports = About;
