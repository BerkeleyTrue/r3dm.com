var React = require('react'),
    Block = require('./work_block');

var Work = React.createClass({displayName: "Work",
  getDefaultProps: function() {
    return {
      workData: [{
        image: 'images/work_shpe.png',
        url: 'http://sfbayareashpe.org'
      }]
    };
  },

  componentWillMount: function() {
  },

  render: function() {

    var block = [
      'pure-u-1',
      'work_block'
    ].join(' ');

    var size = this.props.workData.length;
    var wb = ' work_block-img-';

    if (size <= 3 ) {
      block += wb + size;
    } else {
      block += wb + '3';
    }

    var Blocks = this.props.workData.map(function(datum) {
      return (
        React.createElement(Block, {
          className: block, 
          key:  datum.url, 
          data: datum })
      );
    });

    return (
      React.createElement("div", {className: "work"}, 
        React.createElement("div", {className: "work_heading"}, 
          React.createElement("h2", null, "RECENT WORK")
        ), 
        React.createElement("div", {className: "pure-g work_content"}, 
          Blocks 
        )
      )
    );
  }
});

module.exports = Work;
