var React = require('react');

var Copy = React.createClass({displayName: "Copy",

  render: function() {
    return (
      React.createElement("div", null, 
         this.props.children[this.props.imgFirst ? 1 : 0], 
         this.props.children[this.props.imgFirst ? 0 : 1] 
      )
    );
  }
});

module.exports = Copy;
