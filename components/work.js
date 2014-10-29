/** @jsx React.DOM */
'use strict';
var React = require('react'),
    Block = require('./work_block');

var Work = React.createClass({
  getDefaultProps: function() {
    return {
      workData: [{
        image: 'images/work_shpe.png',
        url: 'http://sfbayareashpe.org'
      }]
    };
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
        <Block
          className = { block }
          data = { datum }></Block>
      );
    });

    return (
      <div className="work">
        <div className = "work_heading">
          <h2>R3CENT WORK</h2>
        </div>
        <div className = "pure-g work_content" >
          { Blocks }
        </div>
      </div>
    );
  }
});
module.exports = Work;
