var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    StateStreamMixin = require('rx-react').StateStreamMixin,
    BlogStore = require('./blog.store.js'),
    debug = require('debug')('r3dm:components:blog');

var Blog = React.createClass({
  mixins: [StateStreamMixin,
           Router.State],

  getStateStream: function () {
    return BlogStore;
  },

  componentWillMount: function () {
    debug('comp will mount');
    if (this.props.context) {
      debug('found context');
      this.setState(this.props.context);
    }
  },

  render: function () {
    var posts = this.state.posts;
    if (!Array.isArray(posts)) {
      posts = [posts];
    }

    var val = posts.map(function (post) {
      var html = posts.length === 1 ? post.content.extended :
                                      post.content.brief;
      // if (post.publishedDate) {
      //   post.publishedDate = Date(post.publishedDate);
      // } else {
      //   post.publishedDate = new Date();
      // }
      // typeof post.publishedDate ~> string
      post.publishedDate = new Date(post.publishedDate);
      if (!post.author) {
        post.author = {};
        post.author.name = 'none';
      }
      return (
        <div className='post'>
          <Link to='blog' params={{ title: post.title }} key={ post.title } className='post-title'>
            <h1>{ post.title }</h1>
          </Link>
          <div className='date-and-author'>
            { post.publishedDate.toLocaleString('en-US', {month:'long',
                                                day: 'numeric',
                                                year: 'numeric' }) }
                                                &nbsp;|&nbsp;
                                                { post.author.name }
          </div>
          <span dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      );
    });

    debug('will render');
    return (
      <div className='pure-g'>
        <div className='pure-u-1-6'></div>
        <div className='posts-wrapper pure-u-2-3'>{ val }</div>
        <div className='pure-u-1-6'></div>
      </div>
    );
  }
});

module.exports = Blog;
