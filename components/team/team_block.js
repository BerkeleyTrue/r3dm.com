/** @jsx React.DOM */
'use strict';
var React = require('react');

var Block = React.createClass({
  render: function() {
    return (
      <div className = { this.props.className }>
        <div><h3>{ this.props.data.name }</h3></div>
        <div><p>{ this.props.data.copy }</p></div>
      </div>
    );
  }
});
module.exports = Block;
