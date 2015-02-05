var React = require('react'),
    Link = require('react-router').Link,
    FourOhFour = require('../errors/404'),
    StateStreamMixin = require('rx-react').StateStreamMixin,
    BlogStore = require('./Store.js'),
    debug = require('debug')('r3dm:components:blog');

var Blog = React.createClass({displayName: "Blog",
  mixins: [StateStreamMixin],

  getStateStream: function() {
    return BlogStore;
  },

  render: function() {
    var posts = this.state.posts;

    debug('posts:', posts);
    debug('number of posts: ', posts.length);

    if (posts === false) {
      return React.createElement(FourOhFour, null);
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
          React.createElement("div", {className: "post_readmore"}, 
            React.createElement(Link, {
              to: "blog", 
              params: { slug: post.slug}}, 
              "READ THE FULL POST"
            )
          )
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
        React.createElement("section", {
          className: "post", 
          key:  post.slug}, 
          React.createElement("header", null, 
            React.createElement(Link, {
              to: "blog", 
              params: { slug: post.slug}, 
              className: "post_title"}, 
              React.createElement("h1", null,  post.title)
            ), 
            React.createElement("div", {className: "post_subheading"}, 
              publishedDate, " | By: ", authorStr 
            )
          ), 
          React.createElement("span", {dangerouslySetInnerHTML: { __html: html}}), 
          React.createElement("footer", null, 
            readMore 
          )
        )
      );
    });

    return (
      React.createElement("main", {className: "blog"}, 
        React.createElement("div", {className: "blog_layout"}, 
          React.createElement("article", {className: "posts_wrapper"}, 
            val 
          )
        )
      )
    );
  }
});

module.exports = Blog;
