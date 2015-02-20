var React = require('react');

var Banner = React.createClass({

  render: function() {
    return (
      <section className = 'banner'>
        <img src='images/banner.jpg' />
      </section>
    );
  }
});

module.exports = Banner;
