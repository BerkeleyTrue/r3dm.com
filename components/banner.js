/** @jsx React.DOM */
'use strict';
var React = require('react');

var Banner = React.createClass({

  render: function() {
    return (
      <div className = 'first-con_top'>
        <img src = 'images/banner.jpg'/>
      </div>
    );
  }
});
module.exports = Banner;
