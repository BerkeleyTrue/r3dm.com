var React = require('react');

var Copy = React.createClass({
  displayName: 'Copy',
  propTypes: {
    children: React.PropTypes.array,
    imgFirst: React.PropTypes.bool
  },
  render: function() {
    return (
      <div>
        { this.props.children[this.props.imgFirst ? 1 : 0] }
        { this.props.children[this.props.imgFirst ? 0 : 1] }
      </div>
    );
  }
});

module.exports = Copy;
