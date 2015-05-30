import React, { PropTypes } from 'react';
import { createContainer } from 'thundercats';

import Links from './Links.jsx';
import Logo from '../logo';
import Hamburger from '../common/Hamburger.jsx';

let win;

@createContainer({
  actions: 'navActions',
  fetchAction: 'navActions.setLinks',
  getPayload: (props) => props.path,
  shouldContainerFetch(props, nextProps) {
    return props.path !== nextProps.path;
  },
  store: 'NavStore'
})
export default class extends React.Component {
  static displayName = 'Nav'
  static propTypes = {
    links: PropTypes.array,
    navActions: PropTypes.object,
    path: PropTypes.string,
    showNavAtTop: PropTypes.bool
  }

  componentDidMount() {
    win = typeof window !== 'undefined' ? window : null;
  }

  handleHamburgerClick() {
    this.props.navActions.openSideNav(true);
  }

  render() {
    const { links } = this.props;
    const hash = win ? win.location.hash : '';

    return (
      <nav
        className='nav'>
        <div className='nav_logo'>
          <a href='#' target='_self'>
            <Logo
              logoClass='nav_logo-mark'
              type='mark' />
            <Logo
              logoClass='nav_logo-type'
              type='type' />
          </a>
        </div>
        <Links
          className='nav_links nav_links-hide'
          hash={ hash }
          links={ links } />
        <div className='nav_links-hamburger'>
          <Hamburger onClick={ ::this.handleHamburgerClick }/>
        </div>
      </nav>
    );
  }
}
