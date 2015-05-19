var React = require('react');

var Footer = React.createClass({

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    return (
      <footer id="footer">
        Copyright <span className="r3d">&copy;</span> 2015 R3D M
      </footer>
    );
  }
});

module.exports = Footer;
