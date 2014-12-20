var React = require('react/addons'),

    // # Components
    Banner = require('./banner'),
    Logo = require('./logo'),
    Connect = require('./connect'),
    Footer = require('./footer');

var App = React.createClass({displayName: 'App',
  render: function() {

    return (
      React.createElement("div", {className: "main-app"}, 
        React.createElement("div", {className: "logo-container"}, 
          React.createElement(Logo, null)
        ), 
        React.createElement("div", {className: "first-con"}, 
          React.createElement(Banner, null), 
          React.createElement("div", {className: "first-con_bot"}, 
            React.createElement("h2", null, 
              "We build fast, data-rich, offline capable websites that bring" + ' ' +
              "the future to your users."
            )
          )
        ), 
        React.createElement(Connect, null), 
        React.createElement(Footer, null)
      )
    );
  }
});

module.exports = App;
