import React from 'react';
import tweenState from 'react-tween-state';
import { createContainer } from 'thundercats';

import Links from './Links.jsx';
import Logo from '../logo';
import Hamburger from '../common/Hamburger.jsx';

let win;

export default createContainer(React.createClass({
  displayName: 'Nav',
  mixins: [tweenState.Mixin],

  getInitialState: function() {
    this.navActions = this.context.cat.getActions('navActions');
    return {};
  },

  getThundercats: function() {
    return {
      store: 'NavStore'
    };
  },

  componentWillMount: function() {
    this.setState({ top: this.state.showNavAtTop ? 0 : -150 });
  },

  componentDidMount: function() {
    win = typeof window !== 'undefined' ? window : null;
  },

  componentDidUpdate: function() {
    if (this.state.top === -150) {
      this._activateNavTween();
    }
  },

  activateNavTween: function() {
    this.tweenState('top', {
      easing: tweenState.easingTypes.easeInOutQuad,
      stackBehavior: tweenState.stackBehavior.ADDITIVE,
      duration: 1500,
      endValue: this.state.top === 0 ? -150 : 0
    });
  },

  onHamburgerClick: function() {
    this.navActions.openSideNav(true);
  },

  render: function() {
    const { links } = this.state;
    const hash = win ? win.location.hash : '';
    const top = this.getTweeningValue('top');

    const navStyle = {
      WebkitTransform: 'translateY(' + top + 'px)',
      transform: 'translateY(' + top + 'px)'
    };

    return (
      <nav
        className='nav'
        style={ navStyle }>
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
          links={ this.state.links } />
        <div className='nav_links-hamburger'>
          <Hamburger onClick={ this._onHamburgerClick }/>
        </div>
      </nav>
    );
  }
}));
