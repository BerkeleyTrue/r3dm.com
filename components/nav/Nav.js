var React = require('react/addons'),
    tweenState = require('react-tween-state'),

    // # mixins
    StateStreamMixin = require('../util/stateStreamMixin'),

    // # components
    Links = require('./Links'),
    Logo = require('../logo'),
    Hamburger = require('../common/Hamburger'),

    // # flux
    NavStore = require('./Store'),
    NavActions = require('./Actions');

var win;
var Nav = React.createClass({displayName: "Nav",
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
    var atTop = this.state.scrollTop < 50;
    if (atTop) {
      if (this.state.showNav !== this.state.showNavAtTop) {

        NavActions.setShowNav(this.state.showNavAtTop);
        if (this.state.top !== (this.state.showNavAtTop ? 0 : -150)) {
          this._activateNavTween();
        }
      }
      return;
    }
    // if not at the top and isScrollingDown XNOR showNav, activate tween
    if (this.state.isScrollingDown ? this.state.showNav : !this.state.showNav) {

      NavActions.setShowNav(!this.state.showNav);
      this._activateNavTween();
    }
  },

  _activateNavTween: function() {
    this.tweenState('top', {
      easing: tweenState.easingTypes.easeInOutQuad,
      stackBehavior: tweenState.stackBehavior.ADDITIVE,
      duration: 500,
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
      React.createElement("nav", {
        className: "nav", 
        style: navStyle }, 
        React.createElement("div", {className: "nav_logo"}, 
          React.createElement(Logo, {
            type: "mark", 
            logoClass: "nav_logo-mark"}), 
          React.createElement(Logo, {
            type: "type", 
            logoClass: "nav_logo-type"})
        ), 
        React.createElement(Links, {
          hash: hash, 
          className: "nav_links nav_links-hide", 
          links:  this.state.links}), 
        React.createElement("div", {className: "nav_links-hamburger"}, 
          React.createElement(Hamburger, {onClick:  this._onHamburgerClick})
        )
      )
    );
  }
});

module.exports = Nav;
