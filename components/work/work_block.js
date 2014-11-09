/** @jsx React.DOM */
'use strict';
var React = require('react');

var Block = React.createClass({
  render: function() {
    return (
      <div className = { this.props.className }>
        <div>
          <img src = { this.props.data.image } />
        </div>
      </div>
    );
  }
});
module.exports = Block;
