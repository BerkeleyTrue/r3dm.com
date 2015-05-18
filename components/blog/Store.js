import { Store } from 'thundercats';

export default class BlogStore extends Store {
  constructor(r3d) {
    super();
    this.value = {
      error: false,
      posts: []
    };

    const {
      onError,
      setPosts
    } = r3d.getActions('blogActions');

    this.register(Store.setter(onError));
    this.register(Store.setter(setPosts));
  }
  static displayName = 'BlogStore'
}
