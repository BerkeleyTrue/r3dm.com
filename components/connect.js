/** @jsx React.DOM */
'use strict';
var React = require('react');

var Connect = React.createClass({
  render: function() {
    return (
      <div className = 'connect'>
        <div className = 'connect_heading'>
          <h2>CONN<span className = 'threes'>3</span>CT</h2>
        </div>
        <div>
          <input
            type = 'text'/>
        </div>
        <div>
          <button className = 'pure-button'>Connect</button>
        </div>
      </div>
    );
  }
});
module.exports = Connect;
