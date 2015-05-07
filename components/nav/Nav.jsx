var React = require('react/addons'),
    tweenState = require('react-tween-state'),

    // # mixins
    StateStreamMixin = require('../util/stateStreamMixin'),

    // # components
    Links = require('./Links.jsx'),
    Logo = require('../logo'),
    Hamburger = require('../common/Hamburger.jsx'),

    // # flux
    NavStore = require('./Store'),
    NavActions = require('./Actions');

var win;
var Nav = React.createClass({
  mixins: [
    tweenState.Mixin,
    StateStreamMixin
  ],

  getStateStream: function() {
    return NavStore;
  },

  componentWillMount: function() {
    this.setState({ top: this.state.showNavAtTop ? 0 : -150 });
  },

  componentDidMount: function() {
    win = typeof window !== 'undefined' ? window : null;
  },

  componentDidUpdate: function() {
    // this is if is a hack, without this if-statement the function gets called too much
    if (this.state.top === -150) {
      this._activateNavTween();
    }
  },

  _activateNavTween: function() {
    this.tweenState('top', {
      easing: tweenState.easingTypes.easeInOutQuad,
      stackBehavior: tweenState.stackBehavior.ADDITIVE,
      duration: 1500,
      endValue: this.state.top === 0 ? -150 : 0
    });
  },

  _onHamburgerClick: function() {
    NavActions.openSideNav(true);
  },

  render: function() {
    var state = this.state,
        links = state.links,
        hash = win ? win.location.hash : '',
        top = this.getTweeningValue('top');

    var navStyle = {
      WebkitTransform: 'translateY(' + top + 'px)',
      transform: 'translateY(' + top + 'px)'
    };

    return (
      <nav
        className='nav'
        style={ navStyle }>
        <div className='nav_logo'>
          <a href="#" target="_self">
            <Logo
              type='mark'
              logoClass='nav_logo-mark'/>
            <Logo
              type='type'
              logoClass='nav_logo-type'/>
          </a>
        </div>
        <Links
          hash={ hash }
          className='nav_links nav_links-hide'
          links={ this.state.links }/>
        <div className='nav_links-hamburger'>
          <Hamburger onClick={ this._onHamburgerClick }/>
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
