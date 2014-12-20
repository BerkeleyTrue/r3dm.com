var React = require('react'),
    data = require('./team_data').data,
    Block = require('./team_block');

var Team = React.createClass({
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
        <Block
          key = { datum.title }
          data = { datum }
          className = { blockClass }></Block>
      );
    });

    return (
      <div className='team'>
        <div className = 'team_heading'>
          <h2>THE T<span className = 'threes'>3</span>AM</h2>
        </div>
        <div>
          { Blocks }
        </div>
      </div>
    );
  }
});
module.exports = Team;
