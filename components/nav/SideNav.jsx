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

var SideNav = React.createClass({
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
      <div>
        <nav className={ sideNavClass }>
          <Links links={ links } />
        </nav>
        <OverLay
          show={ this.state.open }
          onClick={ this._overlayClick }/>
      </div>
    );
  }
});

module.exports = SideNav;
