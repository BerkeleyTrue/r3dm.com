import _ from 'lodash';
import { Store } from 'thundercats';

export default class AppStore extends Store {
  constructor(r3d) {
    super();

    this.value = {
      scrollTop: 0,
      isScrolling: false,
      isScrollingDown: true
    };

    const {
      setIsScrolling,
      setScroll
    } = r3d.getActions('appActions');

    this.register(
      setIsScrolling.map(isScrolling => ({ set: { isScrolling } }))
    );

    this.register(setScroll.map(scrollTop => ({
      transform(oldState) {
        const newState = _.assign({}, oldState, { scrollTop });

        if (oldState.scrollTop < scrollTop) {
          newState.isScrollingDown = true;
        } else {
          newState.isScrollingDown = false;
        }

        return newState;
      }
    })));
  }
}

module.exports = AppStore;
