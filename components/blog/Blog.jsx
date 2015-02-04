var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    FourOhFour = require('../errors/404'),
    StateStreamMixin = require('rx-react').StateStreamMixin,
    BlogStore = require('./Store.js'),
    debug = require('debug')('r3dm:components:blog');

var Blog = React.createClass({
  mixins: [
    StateStreamMixin,
    Router.State
  ],

  getStateStream: function() {
    return BlogStore;
  },

  render: function() {
    var posts = this.state.posts;

    debug('posts:', posts);
    debug('number of posts: ', posts.length);

    if (posts === false) {
      return <FourOhFour />;
    }

    /* Iterates over the posts returned from Mongodb.
     * If there is only one render the single-blog-post-view.
     * Else, render a list of blog briefs that link to the whole versions.
    */
    var val = posts.map(function(post) {
      var html, readMore, authorStr, publishedDate;

      if (posts.length === 1) {
        html = post.content.extended;
      } else {
        html = post.content.brief;
        readMore = (
          <div className='read-full-story-container'>
            <Link
              to='blog'
              params={{ slug: post.slug }}
              className='read-full-story'>
              READ THE FULL POST
            </Link>
          </div>
        );
      }

      if (post.publishedDate) {
        publishedDate = new Date(post.publishedDate)
          .toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
      } else {
        publishedDate = 'not published';
      }

      if (post.author) {
        authorStr = post.author.name.first + ' ' + post.author.name.last;
      } else {
        authorStr = 'no author';
      }

      return (
        <div
          className='post'
          key={ post.slug }>
          <Link
            to='blog'
            params={{ slug: post.slug }}
            className='post-slug'>
            <h1>{ post.title }</h1>
          </Link>
          <div className='date-and-author'>
            { publishedDate } | By: { authorStr }
          </div>
          <span dangerouslySetInnerHTML={{ __html: html }} />
          { readMore }
        </div>
      );
    });

    return (
      <div className="blog-app">
        <div className='pure-g blog-layout'>
          <div className='pure-u-1-6'></div>
          <div className='posts-wrapper pure-u-2-3'>{ val }</div>
          <div className='pure-u-1-6'></div>
        </div>
      </div>
    );
  }
});

module.exports = Blog;
