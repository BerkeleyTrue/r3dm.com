/** @jsx React.DOM */
'use strict';
var React = require('react');

var Block = React.createClass({
  render: function() {
    return (
      <div className = { this.props.className }>
        <div>icon</div>
        <div><h3>{ this.props.title }</h3></div>
        <div><p>{ this.props.copy }</p></div>
      </div>
    );
  }
});

module.exports = Block;
