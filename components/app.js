/** @jsx React.DOM */
'use strict';
var React = require('react/addons'),
    Banner = require('./banner/banner'),
    Services = require('./services/services'),
    //Work = require('./work/work'),
    Connect = require('./connect/connect'),
    Logo = require('./logo/logo');

var App = React.createClass({
  render: function() {

    return (
      <div className="main-app">
        <div className="logo-container">
          <Logo></Logo>
        </div>
        <div className="first-con">
          <Banner></Banner>
          <div className="first-con_bot">
            <h2>Hello, We Are Cyber Wizards.</h2>
          </div>
        </div>
        <Services></Services>
        <Connect></Connect>
      </div>
    );
  }
});

module.exports = App;
