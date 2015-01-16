var React = require('react'),
    debug = require('debug')('r3dm:blog');

var Blog = React.createClass({
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
