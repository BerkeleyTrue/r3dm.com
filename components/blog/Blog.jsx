import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'thundercats'; // eslint-disable-line
import ComingSoon from '../errors/ComingSoon.jsx';

// decorators currently don't count as use in babel-eslint
// see: https://github.com/babel/babel-eslint/issues/72

@createContainer
export default class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: PropTypes.func
  }
  static displayName = 'Blog'
  static propTypes = {
    posts: PropTypes.array
  }

  getThundercats(props, context) {
    return {
      store: 'blogStore',
      map: ({ posts }) => ({ posts }),
      fetchAction: 'blogActions.setSlug',
      fetchPayload: {
        slug: context.router.getCurrentParams().slug
      }
    };
  }

  renderPosts(posts) {
    // Iterates over the posts
    // If there is only one render the single-blog-post-view.
    // Else, render a list of blog briefs that link to the whole versions.
    return posts.map(post => {
      let html, readMore, authorStr, publishedDate, coverImg, translationLink;

      if (posts.length === 1) {
        html = post.content.extended.html;
      } else {
        html = post.content.brief.html;
        readMore = (
          <div className='post_readmore'>
            <Link
              params={{ slug: post.slug }}
              to='blog'>
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
          <div className='post-cover'>
            <img src={ post.cover.url }></img>
          </div>
        );
      }

      if (post.translation && posts.length === 1) {
        if (post.language === 'English') {
          translationLink = (
            <Link
              className='translation-link'
              params={{ slug: post.translation.slug }}
              to='blog'>
              Lea Esto en Español
            </Link>
          );
        }
        if (post.language === 'Español') {
          translationLink = (
            <Link
              className='translation-link'
              params={{ slug: post.translation.slug }}
              to='blog'>
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
              className='post_title'
              params={{ slug: post.slug }}
              to='blog'>
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
  }

  render() {
    const { posts } = this.props;

    if (!posts.length) {
      return <ComingSoon />;
    }

    return (
      <main className='blog'>
        <div className='blog_layout'>
          <article className='posts_wrapper'>
            { this.renderPosts(posts) }
          </article>
        </div>
      </main>
    );
  }
}
