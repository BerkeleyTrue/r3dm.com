import { Store } from 'thundercats';
import { homeLinks } from './constants';
import { createSetObject } from '../util';

export default class extends Store {
  constructor(r3d) {
    super();
    this.value = {
      isScrollingDown: false,
      isSideNavOpen: false,
      showNav: true,
      showNavAtTop: false,
      links: homeLinks.slice()
    };

    const {
      openSideNav,
      setLinks,
      setShowNav,
      setShowNavAtTop
    } = r3d.getActions('navActions');

    const appStore = r3d.getActions('appStore');

    this.register(openSideNav.map(createSetObject));
    this.register(setLinks.map(createSetObject));
    this.register(setShowNav.map(createSetObject));
    this.register(setShowNavAtTop.map(createSetObject));
    this.register(
      appStore
        .debounce(20)
        .map(({ isScrollingDown, scrollTop }) => ({
          isScrollingDown,
          scrollTop
        }))
        .map(createSetObject)
    );
  }
}
