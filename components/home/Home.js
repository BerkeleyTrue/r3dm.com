var React = require('react/addons'),
    // debug = require('debug')('r3dm:comp:home'),

    // # Components
    Banner = require('../banner'),
    Logo = require('../logo'),
    Services = require('../services'),
    Work = require('../work'),
    Connect = require('../connect');

var Home = React.createClass({displayName: "Home",

  render: function() {

    return (
      React.createElement("main", {className: "main-app"}, 
        React.createElement("div", {className: "logo-container"}, 
          React.createElement("div", {className: "v-center"}, 
            React.createElement("div", null, 
              React.createElement(Logo, {logoClass: "logo"})
            )
          )
        ), 
        React.createElement("section", {className: "first-con"}, 
          React.createElement(Banner, null), 
          React.createElement("div", {className: "first-con_bot"}, 
            React.createElement("header", null, 
              React.createElement("p", null, 
                "We build fast, data-rich, offline capable websites that bring" + ' ' +
                "the future to your users."
              )
            )
          )
        ), 
        React.createElement(Services, null), 
        React.createElement(Work, null), 
        React.createElement(Connect, null)
      )
    );
  }
});

module.exports = Home;
