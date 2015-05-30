import React, { PropTypes } from 'react';
import { RouteHandler, State } from 'react-router';
import { createContainer } from 'thundercats';
import ScrollMixin from '../util/scrollMixin';
import Nav from '../nav';
import SideNav from '../nav/SideNav.jsx';
import Footer from '../footer';

export default createContainer(
  {
    store: 'AppStore',
    actions: 'appActions'
  },
  React.createClass({
    displayName: 'App',
    mixins: [
      ScrollMixin,
      State
    ],

    propTypes: {
      appActions: PropTypes.object,
      isScrolling: PropTypes.bool,
      scrollTop: PropTypes.number
    },

    getInitialState() {
      return {};
    },

    setScroll: function() {
      this.props.appActions.setScroll(...arguments);
    },

    setIsScrolling: function() {
      this.props.appActions.setIsScrolling(...arguments);
    },

    render: function() {
      const path = this.getPath();

      return (
        <div>
          <Nav path={ path } />
          <RouteHandler />
          <Footer />
          <SideNav />
        </div>
      );
    }
  })
);
