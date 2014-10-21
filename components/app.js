/** @jsx React.DOM */
'use strict';
var React = require('react/addons'),
    Banner = require('./banner'),
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
        <div className="services con">
        </div>
        <div className="work con">
        </div>
        <div className="team con">
        </div>
        <div className="connect con">
        </div>
      </div>
    );
  }
});

module.exports = App;
