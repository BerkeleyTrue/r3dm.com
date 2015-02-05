var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    StateStreamMixin = Router.StateStreamMixin,
    NavStore = require('./Store.js'),
    RouterState = Router.State,
    debug = require('debug')('r3dm:nav');

var Nav = React.createClass({
  mixins: [
    StateStreamMixin,
    RouterState
  ],

  getStateStream: function() {
    return NavStore;
  },

  componentDidMount: function() {
  },

  handleHashLink: function(e) {
    debug('Handle link', e.target.id);
    var hash = e.target.name;
    e.preventDefault();
    window.location.hash = '';
    window.location.hash = hash;
  },

  render: function() {
    debug('navbar state', this.state);
    var links = this.state.links;
    var pathname = this.getPathname();

    var val = links.map(function(link) {
      var classNameActive = link.path === pathname ? 'active' : '';

      if (link.path.indexOf('#') !== -1) {
        return (
          <li key={ link.path } className={classNameActive}>
            <a href={ link.path } target='_self'>
                { link.name }
            </a>
          </li>
        );
      } else {
        return (
          <li key={ link.path } className={classNameActive}>
            <Link to={ link.path }>{ link.name }</Link>
          </li>
        );
      }
    });

    return (
      <nav className = 'nav'>
        <ul className = 'nav-pullRight'>
          { val }
        </ul>
      </nav>
    );
  }
});

module.exports = Nav;
