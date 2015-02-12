var React = require('react/addons'),
    tweenState = require('react-tween-state'),

    // # mixins
    StateStreamMixin = require('../util/stateStreamMixin'),

    // # components
    Links = require('./Links'),
    Hamburger = require('../common/Hamburger'),

    NavStore = require('./Store'),
    NavActions = require('./Actions');

var Nav = React.createClass({displayName: "Nav",
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

    return (
      React.createElement("nav", {
        className: "nav", 
        style: navStyle }, 
        React.createElement(Links, {
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
