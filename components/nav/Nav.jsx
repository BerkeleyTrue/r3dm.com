var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    State = Router.State,
    debug = require('debug')('r3dm:nav');

var Nav = React.createClass({
  mixins: [
    State
  ],

  getInitialState: function() {
    return {
      links: [
        { name: 'Home', path: '/' },
        { name: 'Connect', path: '#connect' },
        { name: 'Blog', path: '/blog' }
      ]
    };
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
    var links = this.state.links;
    var pathname = this.getPathname();
    // debug('path is:', this.getPath());
    // debug('pathname is:', this.getPathname());
    // debug('params is:', this.getParams());
    // debug('query is:', this.getQuery());
    // debug('routes is:', this.getRoutes());

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
