import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { formatDate } from '../util';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  static displayName = 'Post'
  static propTypes = {
    post: PropTypes.object,
    showBrief: PropTypes.bool
  }

  shouldComponentUpdate(nextProps) {
    return this.props.post.slug !== nextProps.post.slug ||
      this.props.showBrief !== nextProps.showBrief;
  }

  renderContent(showBrief, content) {
    return (
      <span dangerouslySetInnerHTML={{
        __html: showBrief ? content.brief.html : content.extended.html
      }} />
    );
  }

  renderFooter(showBrief, slug) {
    if (!showBrief) {
      return (
        <footer>
          <div className='post_readmore'>
            <Link
              params={{ slug: null }}
              to='blog'>
              Back
            </Link>
          </div>
        </footer>
      );
    }
    return (
      <footer>
        <div className='post_readmore'>
          <Link
            params={{ slug: slug }}
            to='blog'>
            READ THE FULL POST
          </Link>
        </div>
      </footer>
    );
  }

  renderCover(url) {
    if (!url) {
      return null;
    }
    return (
      <div className='post-cover'>
        <img src={ url }></img>
      </div>
    );
  }

  render() {
    const {
      author,
      content,
      cover,
      publishedDate,
      slug,
      title
    } = this.props.post;

    const { showBrief } = this.props;
    const authorStr = author ?
      author.name.first + ' ' + author.name.last :
      'The R3DM';

    const formatedDate = formatDate(publishedDate);
    return (
      <section
        className='post'>
        <header>
          <Link
            className='post_title'
            params={{ slug }}
            to='blog'>
            { this.renderCover(cover ? cover.url : null) }
            <h1>{ title }</h1>
          </Link>
          <div className='post_subheading'>
            { formatedDate } | By: { authorStr }
          </div>
        </header>
        { this.renderContent(showBrief, content) }
        { this.renderFooter(showBrief, slug) }
      </section>
    );
  }
}
