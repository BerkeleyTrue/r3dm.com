var React = require('react'),
    cx = React.addons.classSet,

    // # mixins
    StateStreamMixin = require('../util/stateStreamMixin'),

    // # components
    OverLay = require('./OverLay'),
    Links = require('./Links'),

    // # flux
    NavStore = require('./Store'),
    NavActions = require('./Actions');

var SideNav = React.createClass({displayName: "SideNav",
  mixins: [StateStreamMixin],

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

    return (
      React.createElement("div", null, 
        React.createElement("nav", {className: sideNavClass }, 
          React.createElement(Links, {links: links })
        ), 
        React.createElement(OverLay, {
          show:  this.state.open, 
          onClick:  this._overlayClick})
      )
    );
  }
});

module.exports = SideNav;
