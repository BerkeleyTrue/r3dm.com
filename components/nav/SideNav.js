var React = require('react/addons'),
    cx = React.addons.classSet,

    // # mixins
    PureRenderMixin = React.addons.PureRenderMixin,
    StateStreamMixin = require('../util/stateStreamMixin'),

    // # components
    OverLay = require('./OverLay'),
    Link = require('react-router').Link,

    // # flux
    NavStore = require('./Store'),
    NavActions = require('./Actions');

var SideNav = React.createClass({displayName: "SideNav",
  mixins: [
    PureRenderMixin,
    StateStreamMixin
  ],

  getStateStream: function() {
    return NavStore
      .map(function(navState) {
        return {
          open: navState.isSideNavOpen,
          links: navState.links
        };
      });
  },

  _overlayClick: function() {
    NavActions.openSideNav(false);
  },

  render: function() {
    var links = this.state.links;

    var sideNavClass = cx({
      'SideNav': true,
      'SideNav-close': !this.state.open
    });

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
      React.createElement("div", null, 
        React.createElement("nav", {className: sideNavClass }, 
          React.createElement("ul", null, 
            val 
          )
        ), 
        React.createElement(OverLay, {
          show:  this.state.open, 
          onClick:  this._overlayClick})
      )
    );
  }
});

module.exports = SideNav;
