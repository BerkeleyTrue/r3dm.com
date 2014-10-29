/** @jsx React.DOM */
'use strict';
var React = require('react');

var Block = React.createClass({
  render: function() {
    return (
      <div>
        <h3>{ this.props.data.name }</h3>
        <p>{ this.props.data.copy }</p>
      </div>
    );
  }
});
module.exports = Block;
