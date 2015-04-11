var React = require('react');

var Banner = React.createClass({

  render: function() {
    return (
      <section className = 'banner'>
        <img src='images/banner.png' />
      </section>
    );
  }
});

module.exports = Banner;
