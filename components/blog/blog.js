var React = require('react'),
    Link = require('react-router').Link,
    StateStreamMixin = require('rx-react').StateStreamMixin,
    blogStores = require('./blog.stores.js'),
    debug = require('debug')('r3dm:blog:component');

var Blog = React.createClass({displayName: "Blog",
  mixins: [StateStreamMixin],

  getStateStream: function() {
    return blogStores;
  },

  componentWillMount: function() {
    debug('comp will mount');
    if (this.props.context) {
      debug('found context');
      this.setState(this.props.context);
    }
  },

  render: function() {
    var posts = this.state.posts;
    if (!Array.isArray(posts)) {
      posts = [posts];
    }
    debug('posts', posts);
    var val = posts.map(function(post) {
      return (
        React.createElement(Link, {to: "blog", params: { title: post.title}, key:  post.title}, 
          React.createElement("div", {className: "post"}, 
            React.createElement("h3", null,  post.title), 
            React.createElement("span", {dangerouslySetInnerHTML: { __html: post.content.brief}})
          )
        )
      );
    });
    debug('will render');
    return React.createElement("div", null, val );
  }
});

module.exports = Blog;
