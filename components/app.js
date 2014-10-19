/** @jsx React.DOM */
'use strict';
var React = require('react/addons'),
    Logo = require('./logo');

var App = React.createClass({
  render: function() {

    return (
      <div className="main-app">
        <div className="logo-container">
          <Logo></Logo>
        </div>
        <div className="first-con">
          <div className="first-con_top"></div>
          <div className="first-con_bot"></div>
        </div>
        <div className="sec-con">
        </div>
      </div>
    );
  }
});

module.exports = App;
