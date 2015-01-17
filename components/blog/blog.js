var React = require('react'),
    StateStreamMixin = require('rx-react').StateStreamMixin,
    blogStores = require('./blog.stores.js'),
    debug = require('debug')('r3dm:blog:component');

var Blog = React.createClass({displayName: "Blog",
  mixins: [StateStreamMixin],

  getStateStream: function() {
    blogStores.subscribe(function(state) {
      debug('state', state);
    });
    return blogStores;
  },

  componentWillMount: function() {
    debug('will mount');
    if (this.props.context) {
      debug('found context', this.props.context);
      this.setState(this.props.context);
    }
  },

  render: function() {
    blogStores.subscribe(function(state) {
      debug('state', state);
    });
    var posts = this.state.posts;
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
