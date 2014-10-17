/** @jsx React.DOM */
'use strict';
var React = require('react/addons'),
    Logo = require('./logo');

var App = React.createClass({
  render: function() {

    return (
      <div className="logo-container">
        <Logo></Logo>
      </div>
    );
  }
});

module.exports = App;
