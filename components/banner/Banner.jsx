var React = require('react');

var Banner = React.createClass({
  displayName: 'Banner',

  render: function() {
    return (
      <section className='banner'>
        <img src='images/banner.png' />
      </section>
    );
  }
});

module.exports = Banner;
