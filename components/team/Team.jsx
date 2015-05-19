var React = require('react'),
    data = require('./team_data').data,
    Block = require('./TeamBlock.jsx');

var Team = React.createClass({
  displayName: 'Team',
  propTypes: {
    data: React.PropTypes.array
  },
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
          className={ blockClass }
          data={ datum }
          key={ datum.name } />
      );
    });

    return (
      <div
        className='team'
        id='team'>
        <div className='team_heading'>
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
