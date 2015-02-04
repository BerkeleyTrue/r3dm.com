var React = require('react'),
    Isvg = require('react-inlinesvg'),
    LogoSvg = React.createFactory(require('./LogoSvg'));

var Logo = React.createClass({displayName: "Logo",
  render: function() {
    return (
      React.createElement("div", {className: "v-center"}, 
        React.createElement("div", null, 
          React.createElement(Isvg, {
            className: "logo", 
            wrapper:  React.DOM.div, 
            preloader: LogoSvg, 
            src: "images/logos/logo.svg"}, 
            React.createElement("img", {src: "images/logo-mark.png"})
          )
        )
      )
    );
  }
});
module.exports = Logo;
