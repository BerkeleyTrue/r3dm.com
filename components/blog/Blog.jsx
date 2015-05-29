import React, { PropTypes } from 'react';
import Post from '../post';
import { createContainer } from 'thundercats';

@createContainer({
  actions: 'blogActions',
  fetchAction: 'blogActions.setSlug',
  store: 'blogStore',
  map: ({ posts }) => ({ posts }),
  shouldContainerFetch(props, nextProps) {
    return props.params.slug !== nextProps.params.slug;
  },
  getPayload: (props) => ({
    slug: props.params.slug
  })
})
export default class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  static displayName = 'Blog'
  static propTypes = {
    blogActions: PropTypes.object,
    params: PropTypes.object,
    posts: PropTypes.array
  }

  shouldComponentUpdate(nextProps) {
    return this.props.params.slug !== nextProps.params.slug ||
      this.props.posts !== nextProps.posts;
  }

  renderPosts(posts) {
    const showBrief = posts.length !== 1;
    return posts.map(post => {
      return (
        <Post
          key={ post.slug }
          post={ post }
          showBrief={ showBrief } />
      );
    });
  }

  render() {
    const { posts } = this.props;

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
