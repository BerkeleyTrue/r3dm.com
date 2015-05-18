import React, { PropTypes } from 'react';
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
    appActions: PropTypes.object,
    isScrolling: PropTypes.bool,
    scrollTop: PropTypes.number
  },

  getInitialState() {
    return {};
  },

  getThundercats: function() {
    return {
      store: 'AppStore',
      actions: 'appActions'
    };
  },

  setScroll: function() {
    this.props.appActions.setScroll(...arguments);
  },

  setIsScrolling: function() {
    this.props.appActions.setIsScrolling(...arguments);
  },

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
