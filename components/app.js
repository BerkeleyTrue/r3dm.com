/** @jsx React.DOM */
'use strict';
var React = require('react'),
    Isvg = require('react-inlinesvg');

var App = React.createClass({
  render: function() {
    var state = this.state,
        props = this.props;
    return (
      <div>
        <div className="logo_container">
          <Isvg
            className="logo-mark"
            src="images/logos/logo-mark.svg"
            wrap="div">
            <img src="images/logo-mark.png" />
          </Isvg>
          <Isvg
            className="logo-type"
            src="images/logos/logo-type.svg">
            <img src="images/logo-type.png" />
          </Isvg>
        </div>
      </div>
      
    );
  }
});

module.exports = App;
