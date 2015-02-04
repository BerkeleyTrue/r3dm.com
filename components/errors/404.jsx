var React = require('react');

var FourOhFour = React.createClass({

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    return (
      <section className='notFound'>
        <div className='notFound_layout'>
          <div className='notFound_main'>
            <header>
              <h1>404</h1>
              <p>Page Not Found</p>
            </header>
            <div className='notFound_desc'>
              Sorry, this is not the page you are looking for.
            </div>
          </div>
        </div>
      </section>
    );
  }
});
module.exports = FourOhFour;
