var React = require('react/addons'),

    // # mixins
    // scrollMix = require('react-scroll-components').ScrollListenerMixin,
    PureRender = React.addons.PureRenderMixin,

    // # Components
    Banner = require('../banner'),
    Logo = require('../logo'),
    Work = require('../work'),
    Connect = require('../connect');

var Home = React.createClass({displayName: "Home",
  mixins: [PureRender],
  render: function() {

    return (
      React.createElement("main", {className: "main-app"}, 
        React.createElement("div", {className: "logo-container"}, 
          React.createElement(Logo, null)
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
        React.createElement(Work, null), 
        React.createElement(Connect, null)
      )
    );
  }
});

module.exports = Home;
