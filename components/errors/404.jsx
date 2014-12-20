var React = require('react');

var FourOhFour = React.createClass({
  render: function() {
    return (
      <div className = 'middle-box text-center animated fadeInDown'>
        <h1>404</h1>
        <h3 className = 'font-bold'>Page Not Found</h3>
        <div className = 'error-desc'>
          Sorry, this is not the page you are looking for.
        </div>
      </div>
    );
  }
});
module.exports = FourOhFour;
