import { Store } from 'thundercats';

const createSetObject = newState => ({ set: newState });

export default class BlogStore extends Store {
  constructor(r3d) {
    super();
    this.value = {
      loading: false,
      error: false,
      posts: []
    };

    const {
      loading,
      onError,
      setPosts
    } = r3d.getActions('blogActions');

    this.register(loading.map(createSetObject));
    this.register(onError.map(createSetObject));
    this.register(setPosts.map(createSetObject));
  }
}
