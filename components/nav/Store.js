import { Store } from 'thundercats';
import { homeLinks } from './constants';

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
    const register = Store.createRegistrar(this);
    function registerSetter(observable) {
      return register(Store.setter(observable));
    }

    registerSetter(openSideNav);
    registerSetter(setLinks);
    registerSetter(setShowNav);
    registerSetter(setShowNavAtTop);
    registerSetter(
      appStore
        .debounce(20)
        .map(({ isScrollingDown, scrollTop }) => ({
          isScrollingDown,
          scrollTop
        }))
    );
  }
}
