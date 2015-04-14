var React = require('react'),
    data = require('./team_data').data,
    Block = require('./TeamBlock.jsx');

var Team = React.createClass({
  getDefaultProps: function() {
    return { data: data };
  },

  render: function() {
    var blockClass = [
      'team_block',
      'team_block-padding'
    ].join(' ');

    var Blocks = this.props.data.map(function(datum) {
      return (
        <Block
          key = { datum.name }
          data = { datum }
          className = { blockClass }></Block>
      );
    });

    return (
      <div id='team' className='team'>
        <div className = 'team_heading'>
          <h2>THE TEAM</h2>
        </div>
        <div className='blocks-container'>
          { Blocks }
        </div>
      </div>
    );
  }
});
module.exports = Team;
