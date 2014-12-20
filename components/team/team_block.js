var React = require('react');

var Block = React.createClass({displayName: 'Block',
  render: function() {
    return (
      React.createElement("div", {className:  this.props.className}, 
        React.createElement("div", null, React.createElement("h3", null,  this.props.data.name)), 
        React.createElement("div", null, React.createElement("p", null,  this.props.data.copy))
      )
    );
  }
});
module.exports = Block;
