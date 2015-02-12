var React = require('react/addons'),

    tweenState = require('react-tween-state'),
    Router = require('react-router'),

    Link = Router.Link,
    Hamburger = require('../common/Hamburger'),

    StateStreamMixin = require('../util/stateStreamMixin'),

    NavStore = require('./Store.js');

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

  render: function() {
    var state = this.state,
        links = state.links,
        navStyle = { top: this.getTweeningValue('top') };

    var val = links.map(function(link) {

      if (link.path.indexOf('#') !== -1) {
        return (
          React.createElement("li", {key:  link.path}, 
            React.createElement("a", {href:  link.path, target: "_self"}, 
                 link.name
            )
          )
        );
      } else {
        return (
          React.createElement("li", {key:  link.path}, 
            React.createElement(Link, {to:  link.path},  link.name)
          )
        );
      }
    });

    return (
      React.createElement("nav", {
        className: "nav", 
        style: navStyle }, 
        React.createElement("ul", {className: "nav_links nav_links-hide"}, 
          val 
        ), 
        React.createElement("div", {className: "nav_links-hamburger"}, 
          React.createElement(Hamburger, null)
        )
      )
    );
  }
});

module.exports = Nav;
