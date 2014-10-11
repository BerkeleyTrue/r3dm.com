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
        <Isvg
          src="images/logos/logo.svg" >
          <img src="images/logo.png" />
        </Isvg>
        R3DM
      </div>
      
    );
  }
});

module.exports = App;
