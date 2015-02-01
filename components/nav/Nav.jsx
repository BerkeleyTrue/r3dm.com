var React = require('react'),
    Link = require('react-router').Link,
    debug = require('debug')('r3dm:nav');

var Nav = React.createClass({
  getInitialState: function() {
    var links = [
      { name: 'home', path: '/' },
      { name: 'connect', path: '#connect' },
      { name: 'blog', path: '/blog' }
    ];

    return {
      active: 'home',
      links: links
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
