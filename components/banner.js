/** @jsx React.DOM */
'use strict';
var React = require('react'),
    Image = require('react-imageloader');

var Banner = React.createClass({
  render: function() {
    var banners = [
      //'images/banner-l.jpg 1000w',
      'images/banner-m.jpg 700w',
      'images/banner-s.jpg 500w'
    ].join(', ');

    var sizes = [
      '(max-width: ) 100vw',
      '(max-width: ) 100vw',
      '(max-width: ) 100vw',
      '(max-width: ) 100vw',
    ].join(', ');

    var preLoader = function() {
      return (
        <img srcSet = { banners } sizes = " "/>
      );
    };

    return (
      <div className = 'first-con_top'>
        <Image
          src = 'images/banner-xl.jpg'
          preloader = { preLoader }/>
      </div>
    );
  }
});
module.exports = Banner;
