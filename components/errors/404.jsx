var React = require('react'),
    Nav = require('../nav');

var FourOhFour = React.createClass({
  render: function() {
    return (
      <div className='error-container'>
        <Nav></Nav>
        <div className = 'pure-g error-layout'>
          <div className='pure-u-1-3'></div>
          <div className='pure-u-1-3'>
            <h1>404</h1>
            <h3 className = 'font-bold'>Page Not Found</h3>
            <div className = 'error-desc'>
              Sorry, this is not the page you are looking for.
            </div>
          </div>
          <div className='pure-u-1-3'></div>
        </div>
      </div>
    );
  }
});
module.exports = FourOhFour;
