var React = require('react');

var Copy = React.createClass({

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
