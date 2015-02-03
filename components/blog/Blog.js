var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    Nav = require('../nav'),
    FourOhFour = require('../errors/404'),
    StateStreamMixin = require('rx-react').StateStreamMixin,
    BlogStore = require('./Store.js'),
    debug = require('debug')('r3dm:components:blog');

var Blog = React.createClass({displayName: "Blog",
  mixins: [
    StateStreamMixin,
    Router.State
  ],

  getStateStream: function() {
    return BlogStore;
  },

  render: function() {
    var posts = this.state.posts;

    debug('number of posts: ', posts.length);

    if (posts === false) {
      return React.createElement(FourOhFour, null);
    }

    /* Iterates over the posts returned from Mongodb.
     * If there is only one render the single-blog-post-view.
     * Else, render a list of blog briefs that link to the whole versions.
    */
    var val = posts.map(function(post) {
      var html, readMore, authorStr;
      debug('post is', post);

      if (post.content) {
        if (posts.length === 1) {
          html = post.content.extended;
        } else {
          html = post.content.brief;
          readMore = (
            React.createElement("div", {className: "read-full-story-container"}, 
              React.createElement(Link, {
                to: "blog", 
                params: { title: post.title}, 
                className: "read-full-story"}, 
                "READ THE FULL POST"
              )
            )
          );
        }
      } else {
        html = '<p>This post has no content</p>';
      }

      if (post.publishedDate) {
        post.publishedDate = new Date(post.publishedDate)
          .toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
      } else {
        post.publishedDate = 'not published';
      }

      if (post.author) {
        authorStr = post.author.name.first + ' ' + post.author.name.last;
      } else {
        authorStr = 'no author';
      }
      debug('post.author.name is:', post.author.name);

      return (
        React.createElement("div", {
          className: "post", 
          key:  post.title}, 
          React.createElement(Link, {
            to: "blog", 
            params: { title: post.title}, 
            className: "post-title"}, 
            React.createElement("h1", null,  post.title)
          ), 
          React.createElement("div", {className: "date-and-author"}, 
             post.publishedDate, " | By: ", authorStr 
          ), 
          React.createElement("span", {dangerouslySetInnerHTML: { __html: html}}), 
          readMore 
        )
      );
    });

    return (
      React.createElement("div", {className: "blog-app"}, 
        React.createElement(Nav, null), 
        React.createElement("div", {className: "pure-g blog-layout"}, 
          React.createElement("div", {className: "pure-u-1-6"}), 
          React.createElement("div", {className: "posts-wrapper pure-u-2-3"}, val ), 
          React.createElement("div", {className: "pure-u-1-6"})
        )
      )
    );
  }
});

module.exports = Blog;
