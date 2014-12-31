var React = require('react'),
    copy = require('./services_copy.json').copy,
    Block = require('./services_block');

var Services = React.createClass({displayName: "Services",

  render: function() {
    var block = [
      'pure-u-1',
      'pure-u-md-1-3',
      'services_block',
      'services_block-padding'
    ].join(' ');

    var Blocks = copy.map(function(copy) {
      return (
        React.createElement(Block, {
          className: block, 
          key:  copy.title, 
          title:  copy.title, 
          copy:  copy.copy})
      );
    });

    return (
      React.createElement("div", {className: "services"}, 
        React.createElement("div", {className: "services_subject-center services_heading"}, 
          React.createElement("h2", null, "SERVICES")
        ), 
        React.createElement("div", {className: "pure-g services_content"}, 
          Blocks 
        )
      )
    );
  }
});

module.exports = Services;
