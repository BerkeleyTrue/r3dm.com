import { Actions } from 'thundercats';
import Fetcher from 'fetchr';
import debugFactory from 'debug';

const debug = debugFactory('r3dm:components:blog:action');

const fetcher = new Fetcher({
  xhrPath: '/api'
});

export default class BlogActions extends Actions {
  constructor() {
    super(['setSlug']);

    this.setSlug.subscribe(slug => {
      debug(this.displayName + ' slug: ', slug);
      fetcher.read('blogService', slug, {}, (err, posts) => {
        if (err) {
          debug('blog err', err);
          return this.onError(true);
        }
        debug('calling set posts with %s posts', posts.length);
        this.setPosts(posts);
      });
    });
  }

  static displayName = 'BlogActions'

  onError(err) {
    return {
      error: err,
      posts: []
    };
  }

  setPosts(posts) {
    return {
      error: false,
      posts: posts && posts.length === 0 ? false : posts
    };
  }
}
