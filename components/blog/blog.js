var React = require('react'),
    globular = require('../globular'),
    debug = require('debug')('r3dm:blog'),
    blogAction = require('./blog.action'),
    routerHistory = require('../common/history.action');

var Blog = React.createClass({displayName: "Blog",
  getInitialState: function() {
    return {
      posts: [
        {title: 'first',
         body: 'laksdjflaskdfjalsdfkjasldfkjasldfj'},
       {title: 'second',
         body: 'laskdjflaskdjfalsdfkjlasdfkjlasdkf'}
      ]
    };
  },

  render: function() {
    var val = this.state.posts.map(function(e) {
      return (
        React.createElement("div", {className: "post"}, 
          React.createElement("h3", null, e.title), 
          React.createElement("p", null, e.body)
        )
      );
    });
    return React.createElement("div", null, val)
  }
});

module.exports = Blog;
