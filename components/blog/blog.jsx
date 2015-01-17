var React = require('react'),
    StateStreamMixin = require('rx-react').StateStreamMixin,
    blogStores = require('./blog.stores.js'),
    debug = require('debug')('r3dm:blog:component');

var Blog = React.createClass({
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
        <div className='post' key = { post.title }>
          <h3>{ post.title }</h3>
          <span dangerouslySetInnerHTML = {{ __html: post.content.extended }} />
        </div>
      );
    });
    return <div>{ val }</div>;
  }
});

module.exports = Blog;
