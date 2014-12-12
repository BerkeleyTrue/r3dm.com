/** @jsx React.DOM */
'use strict';
var React = require('react');

var Banner = React.createClass({

  render: function() {
    return (
      <div className = 'banner'>
        <h1>We Are The R3DM.</h1>
      </div>
    );
  }
});

module.exports = Banner;
