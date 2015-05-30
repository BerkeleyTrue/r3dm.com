import React, { PropTypes } from 'react';
import { RouteHandler } from 'react-router';

import Nav from '../nav';
import SideNav from '../nav/SideNav.jsx';
import Footer from '../footer';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  static displayName = 'App'
  static contextTypes = {
    router: PropTypes.func
  }
  static propTypes = {
    appActions: PropTypes.object,
    isScrolling: PropTypes.bool,
    scrollTop: PropTypes.number
  }

  render() {
    const path = this.context.router.getCurrentPath();

    return (
      <div>
        <Nav path={ path } />
        <RouteHandler />
        <Footer />
        <SideNav />
      </div>
    );
  }
}
