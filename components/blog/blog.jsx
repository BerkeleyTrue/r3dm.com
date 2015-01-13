var React = require('react');

var Blog = React.createClass({
  render: function() {
    return (
      <div className = 'middle-box text-center animated fadeInDown'>
        <h1>Blog</h1>
        <div className = 'error-desc'>
          Sorry, this is not the page you are looking for.
        </div>
      </div>
    );
  }
});
module.exports = Blog;
