/** @jsx React.DOM */
'use strict';
var React = require('react'),
    Isvg = require('react-inlinesvg'),
    LogoSvg = React.createFactory(require('./logo_svg'));

var Logo = React.createClass({
  render: function() {

    var cx = React.addons.classSet;

    var logoContainer = cx({
      '': true
    });

    return (
      <div className = 'v-center'>
        <div className = { logoContainer }>
          <Isvg
            className = 'logo'
            wrapper = { React.DOM.div }
            preloader = { LogoSvg }
            src = 'images/logos/logo.svg'>
            <img src='images/logo-mark.png' />
          </Isvg>
        </div>
      </div>
    );
  }
});
module.exports = Logo;
