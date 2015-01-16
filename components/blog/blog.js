var React = require('react'),
    debug = require('debug')('r3dm:blog');

var Blog = React.createClass({displayName: "Blog",
  getInitialState: function() {
    return {
      loading: '',
      loaded: '',
      failure: false
    };
  },

  render: function() {
    var posts = this.props.posts;
    if (!Array.isArray(posts)) {
      posts = [posts];
    }
    debug('posts', posts);
    var val = posts.map(function(post) {
      return (
        React.createElement("div", {className: "post", key:  post.title}, 
          React.createElement("h3", null,  post.title), 
          React.createElement("span", {dangerouslySetInnerHTML: { __html: post.content.extended}})
        )
      );
    });
    return React.createElement("div", null, val );
  }
});

module.exports = Blog;
