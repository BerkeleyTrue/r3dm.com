import { Store } from 'thundercats';
import { homeLinks } from './constants';

export default class extends Store {
  constructor(r3d) {
    super();
    this.value = {
      isSideNavOpen: false,
      links: homeLinks.slice()
    };

    const {
      openSideNav,
      setLinks,
    } = r3d.getActions('navActions');

    const register = Store.createRegistrar(this);
    function registerSetter(observable) {
      return register(Store.setter(observable));
    }

    registerSetter(openSideNav);
    registerSetter(setLinks);
  }
  static displayName = 'NavStore'
}
