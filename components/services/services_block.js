var React = require('react'),
    Isvg = require('react-inlinesvg');

var Block = React.createClass({displayName: 'Block',
  render: function() {
    var icon = {
      png: 'images/icon-' + this.props.title.toLowerCase() + '.png',
      svg: 'images/icon-' + this.props.title.toLowerCase() + '.svg'
    };
    return (
      React.createElement("div", {className:  this.props.className}, 
        React.createElement("div", null, 
          React.createElement(Isvg, {
            className: "services_block-icon", 
            wrapper:  React.DOM.div, 
            src:  icon.svg}, 
            React.createElement("img", {src:  icon.png})
          )
        ), 
        React.createElement("div", null, React.createElement("h3", null,  this.props.title.toUpperCase() )), 
        React.createElement("div", null, React.createElement("p", null,  this.props.copy))
      )
    );
  }
});

module.exports = Block;
