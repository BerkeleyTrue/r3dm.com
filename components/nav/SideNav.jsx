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

var SideNav = React.createClass({
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
      <div>
        <nav className={ sideNavClass }>
          <ul>
            { val }
          </ul>
        </nav>
        <OverLay
          show={ this.state.open }
          onClick={ this._overlayClick }/>
      </div>
    );
  }
});

module.exports = SideNav;
