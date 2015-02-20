/* eslint max-len:0 */
var React = require('react');

var LogoMark = React.createClass({displayName: "LogoMark",

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    return (
      React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg", 
        width: "561.603", 
        height: "539.013", 
        viewBox: "0 0 561.603 539.013"}, 
        React.createElement("g", {fill: "#BE1E2D"}, 
          React.createElement("path", {d: "M0 0h156.828v539.013H0zM404.775 0h156.828v539.013H404.775zM202.384 0H359.21v539.013H202.385z"})
        )
      )
    );
  }
});

module.exports = LogoMark;
