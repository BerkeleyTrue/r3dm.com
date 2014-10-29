/** @jsx React.DOM */
'use strict';
var React = require('react');

var Block = React.createClass({
  render: function() {
    return (
      <div className = { this.props.className }>
        <div>
          <a href = { this.props.data.url }>
            <img src = { this.props.data.image } />
          </a>
        </div>
      </div>
    );
  }
});
module.exports = Block;
