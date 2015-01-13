var React = require('react');

var Blog = React.createClass({displayName: "Blog",
  render: function() {
    return (
      React.createElement("div", {className: "middle-box text-center animated fadeInDown"}, 
        React.createElement("h1", null, "Blog"), 
        React.createElement("div", {className: "error-desc"}, 
          "Sorry, this is not the page you are looking for."
        )
      )
    );
  }
});
module.exports = Blog;
