var React = require('react');

var Footer = React.createClass({

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    return (
      <footer id="footer">
        Copyright &copy; 2015 R3DM LLC
      </footer>
    );
  }
});

module.exports = Footer;
