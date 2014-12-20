var React = require('react'),
    Isvg = require('react-inlinesvg'),
    LogoSvg = React.createFactory(require('./logo_svg'));

var Logo = React.createClass({displayName: 'Logo',
  render: function() {

    var cx = React.addons.classSet;

    var logoContainer = cx({
      '': true
    });

    return (
      React.createElement("div", {className: "v-center"}, 
        React.createElement("div", {className: logoContainer }, 
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
