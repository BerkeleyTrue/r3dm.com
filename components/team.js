/** @jsx React.DOM */
'use strict';
var React = require('react'),
    data = require('./team_data').data,
    Block = require('./team_block');

var Team = React.createClass({
  getDefaultProps: function() {
    return { data: data };
  },

  render: function() {
    console.log('Render');
    var Blocks = this.props.data.map(function(datum) {
      return (
        <Block
          key = { datum.title }
          data = { datum }
          className = { datum.className }></Block>
      );
    });

    return (
      <div className="team">
        <h2>THE T3AM</h2>
        <div>
          { Blocks }
        </div>
      </div>
    );
  }
});
module.exports = Team;
