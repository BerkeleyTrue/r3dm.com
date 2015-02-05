var React = require('react'),

    Router = require('react-router'),
    Link = Router.Link,

    StateStreamMixin = require('rx-react').StateStreamMixin,

    NavStore = require('./Store.js'),
    debug = require('debug')('r3dm:nav');

var Nav = React.createClass({
  mixins: [StateStreamMixin],

  getStateStream: function() {
    return NavStore;
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
      <nav className = 'nav'>
        <ul className = 'nav-pullRight'>
          { val }
        </ul>
      </nav>
    );
  }
});

module.exports = Nav;
