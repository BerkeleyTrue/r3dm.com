var React = require('react'),
    debug = require('debug')('r3dm:nav');

var Nav = React.createClass({
  getInitialState: function() {
    var links = {
      home: '/'
    };

    return {
      selected: 'home',
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
    return (
      <nav className = 'nav'>
        <ul className = 'nav-pullRight'>
          <li>
            <a
              name = 'connect'
              onClick = { this.handleHashLink }>
              Connect
            </a>
          </li>
        </ul>
      </nav>
    );
  }
});

module.exports = Nav;
