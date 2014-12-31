var React = require('react'),
    data = require('./team_data').data,
    Block = require('./team_block');

var Team = React.createClass({displayName: "Team",
  getDefaultProps: function() {
    return { data: data };
  },

  render: function() {
    var blockClass = [
      'pure-u-1',
      'pure-u-md-1-3',
      'team_block',
      'team_block-padding'
    ].join(' ');

    var Blocks = this.props.data.map(function(datum) {
      return (
        React.createElement(Block, {
          key:  datum.title, 
          data: datum, 
          className: blockClass })
      );
    });

    return (
      React.createElement("div", {className: "team"}, 
        React.createElement("div", {className: "team_heading"}, 
          React.createElement("h2", null, "THE T", React.createElement("span", {className: "threes"}, "3"), "AM")
        ), 
        React.createElement("div", null, 
          Blocks 
        )
      )
    );
  }
});
module.exports = Team;
