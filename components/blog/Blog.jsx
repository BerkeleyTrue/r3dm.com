var React = require('react/addons'),
    // debug = require('debug')('r3dm:components:blog'),

    // # mixins
    PureRenderMixin = React.addons.PureRenderMixin,
    StateStreamMixin = require('../util/stateStreamMixin'),

    // # components
    Link = require('react-router').Link,
    // FourOhFour = require('../errors/404'),
    ComingSoon = require('../errors/ComingSoon'),

    // # flux
    BlogStore = require('./Store.js');

var Blog = React.createClass({
  mixins: [
    PureRenderMixin,
    StateStreamMixin
  ],

  getStateStream: function() {
    return BlogStore;
  },

  render: function() {
    var posts = this.state.posts;

    if (posts === false) {
      return <ComingSoon />;
    }

    // Iterates over the posts
    // If there is only one render the single-blog-post-view.
    // Else, render a list of blog briefs that link to the whole versions.
    var val = posts.map(function(post) {
      var html, readMore, authorStr, publishedDate, coverImg, translationLink;

      if (posts.length === 1) {
        html = post.content.extended.html;
      } else {
        html = post.content.brief.html;
        readMore = (
          <div className='post_readmore'>
            <Link
              to='blog'
              params={{ slug: post.slug }}>
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

      if (post.cover) {
        coverImg = (
          <div className="post-cover">
            <img src={ post.cover.url }></img>
          </div>
        );
      }

      if (post.translation && posts.length === 1) {
        if (post.language === 'English') {
          translationLink = (
            <Link
              to='blog'
              params={{ slug: post.translation.slug }}
              className="translation-link">
              Lea Esto en Español
            </Link>
          );
        }
        if (post.language === 'Español') {
          translationLink = (
            <Link
              to='blog'
              params={{ slug: post.translation.slug }}
              className="translation-link">
              Read this in English
            </Link>
          );
        }
      }

      return (
        <section
          className='post'
          key={ post.slug } >
          <header>
            <Link
              to='blog'
              params={{ slug: post.slug }}
              className='post_title'>
              { coverImg }
              <h1>{ post.title }</h1>
            </Link>
            <div className='post_subheading'>
              { publishedDate } | By: { authorStr }
            </div>
          </header>
          <span dangerouslySetInnerHTML={{ __html: html }} />
          <footer>
            { translationLink }
            { readMore }
          </footer>
        </section>
      );
    });

    return (
      <main className="blog">
        <div className='blog_layout'>
          <article className='posts_wrapper'>
            { val }
          </article>
        </div>
      </main>
    );
  }
});

module.exports = Blog;
