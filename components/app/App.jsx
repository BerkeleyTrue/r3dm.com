import React, { PropTypes } from 'react/addons';
import { RouteHandler } from 'react-router';
import { createContainer } from 'thundercats';
import ScrollMixin from '../util/scrollMixin';
import Nav from '../nav';
import SideNav from '../nav/SideNav.jsx';
import Footer from '../footer';

export default createContainer(React.createClass({
  mixins: [ScrollMixin],
  displayName: 'App',

  propTypes: {
    scrollTop: PropTypes.number,
    isScrolling: PropTypes.bool
  },

  getInitialState() {
    this.appActions = this.context.cat.getActions('appActions');
    return {};
  },

  getThundercats: function() {
    return {
      store: 'AppStore'
    };
  },

  setScroll: this.AppActions.setScroll,
  setIsScrolling: this.AppActions.setIsScrolling,

  render: function() {
    return (
      <div>
        <RouteHandler />
        <Footer />
        <Nav />
        <SideNav />
      </div>
    );
  }
}));
