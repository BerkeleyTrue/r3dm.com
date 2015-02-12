var React = require('react/addons'),

    tweenState = require('react-tween-state'),
    Router = require('react-router'),

    Link = Router.Link,
    Hamburger = require('../common/Hamburger'),

    StateStreamMixin = require('../util/stateStreamMixin'),

    NavStore = require('./Store'),
    NavActions = require('./Actions');

var Nav = React.createClass({
  mixins: [
    tweenState.Mixin,
    StateStreamMixin
  ],

  getStateStream: function() {
    return NavStore;
  },

  componentWillMount: function() {
    this.setState({
      top: 0,
      showNav: true
    });
  },

  componentDidUpdate: function() {
    var atTop = false;
    // Always show at the top
    if (this.state.scrollTop < 50) {
      atTop = true;
      if (!this.state.showNav) { this.setState({ showNav: true }); }
      return;
    }
    // if not at the top and isScrollingDown XNOR showNav, activate tween
    if (!atTop &&
      (this.state.isScrollingDown ? this.state.showNav : !this.state.showNav)) {
      this.setState({ showNav: !this.state.showNav });
      this.tweenState('top', {
        easing: tweenState.easingTypes.easeInOutQuad,
        stackBehavior: tweenState.stackBehavior.ADDITIVE,
        duration: 500,
        endValue: this.state.top === 0 ? -150 : 0
      });
    }
  },

  _onHamburgerClick: function() {
    NavActions.openSideNav(true);
  },

  render: function() {
    var state = this.state,
        links = state.links,
        navStyle = { top: this.getTweeningValue('top') };

    var val = links.map(function(link) {

      if (link.path.indexOf('#') !== -1) {
        return (
          <li key={ link.path }>
            <a href={ link.path } target='_self'>
                { link.name }
            </a>
          </li>
        );
      } else {
        return (
          <li key={ link.path }>
            <Link to={ link.path }>{ link.name }</Link>
          </li>
        );
      }
    });

    return (
      <nav
        className='nav'
        style={ navStyle }>
        <ul className='nav_links nav_links-hide'>
          { val }
        </ul>
        <div className='nav_links-hamburger'>
          <Hamburger onClick={ this._onHamburgerClick }/>
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
