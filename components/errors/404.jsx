var React = require('react');

var FourOhFour = React.createClass({

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    return (
      <section className='error-container'>
        <div className='pure-g error-layout'>
          <div className='pure-u-1-3'></div>
          <div className='pure-u-1-3'>
            <header>
              <h1>404</h1>
              <p className='font-bold'>Page Not Found</p>
            </header>
            <div className='error-desc'>
              Sorry, this is not the page you are looking for.
            </div>
          </div>
          <div className='pure-u-1-3'></div>
        </div>
      </section>
    );
  }
});
module.exports = FourOhFour;
