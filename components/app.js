/** @jsx React.DOM */
'use strict';
var React = require('react/addons'),
    Banner = require('./banner'),
    Services = require('./services'),
    Work = require('./work'),
    Team = require('./team'),
    Connect = require('./connect'),
    Logo = require('./logo');

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
            <h2>Stuff</h2>
          </div>
        </div>
        <Services></Services>
        <Work></Work>
        <Team></Team>
        <Connect></Connect>
      </div>
    );
  }
});

module.exports = App;
