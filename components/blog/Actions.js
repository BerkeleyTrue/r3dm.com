import { Actions } from '../util/createActions';
import Fetcher from 'fetchr';
import debugFactory from 'debug';

const debug = debugFactory('r3dm:components:blog:action');

const fetcher = new Fetcher({
  xhrPath: '/api'
});

export default class BlogActions extends Actions {
  constructor() {
    super([
      'setSlug',
      'setPosts',
      'loading',
      'onError'
    ]);

    this.setSlug.subscribe(payload => {
      debug(this.displayName + ' payload: ', payload);
      this.loading(true);
      fetcher.read('blogService', payload, {}, (err, posts) => {
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

  loading(loading) {
    return {
      loading: loading,
      error: false,
      posts: []
    };
  }

  onError(err) {
    return {
      loading: false,
      error: err,
      posts: []
    };
  }

  setPosts(posts) {
    return {
      loading: false,
      error: false,
      posts: posts && posts.length === 0 ? false : posts
    };
  }
}
