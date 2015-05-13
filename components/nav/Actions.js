import { Actions } from 'thundercats';
import { homeLinks, blogLinks, postLinks } from './constants';

export default class extends Actions {
  constructor() {
    super();
  }

  static displayName = 'NavActions'

  openSideNav(isSideNavOpen) {
    return { isSideNavOpen };
  }

  setLinks(path) {
    if (path.indexOf('/blog') !== -1) {
      if (/blog\/.+/.test(path)) {
        return { links: postLinks.slice() };
      } else {
        return { links: blogLinks.slice() };
      }
    } else {
      return { links: homeLinks.slice() };
    }
  }

  setShowNav(showNav) {
    return { showNav };
  }

  setShowNavAtTop(showNavAtTop) {
    return { showNavAtTop };
  }
}
