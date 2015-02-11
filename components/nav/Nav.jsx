var React = require('react/addons'),

    tweenState = require('react-tween-state'),
    Router = require('react-router'),
    Link = Router.Link,

    StateStreamMixin = require('../util/stateStreamMixin'),

    NavStore = require('./Store.js'),
    debug = require('debug')('r3dm:nav');

var Nav = React.createClass({
  mixins: [
    tweenState.Mixin,
    StateStreamMixin
  ],

  getStateStream: function() {
    return NavStore;
  },

  render: function() {
    var state = this.state,
        links = state.links,
        navStyle = {
          opacity: 1,
          top: 0
        };

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
      <nav className = 'nav' style={ navStyle }>
        <ul className = 'nav-pullRight'>
          { val }
        </ul>
      </nav>
    );
  }
});

module.exports = Nav;
