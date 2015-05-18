var React = require('react');

var ComingSoon = React.createClass({
  displayName: 'ComingSoon',

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    return (
      <section className='notFound'>
        <div className='notFound_layout'>
          <div className='notFound_main'>
            <header>
              <h1>Coming Soon..</h1>
            </header>
            <div className='notFound_desc'>
              Sorry, this is not the blog you are looking for...
            </div>
          </div>
        </div>
      </section>
    );
  }
});
module.exports = ComingSoon;
