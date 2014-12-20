var React = require('react');

var Block = React.createClass({displayName: 'Block',
  render: function() {
    return (
      React.createElement("div", {className:  this.props.className}, 
        React.createElement("div", null, 
          React.createElement("img", {src:  this.props.data.image})
        )
      )
    );
  }
});
module.exports = Block;
