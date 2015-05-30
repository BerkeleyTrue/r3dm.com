import React, { PropTypes } from 'react';
import { createContainer } from 'thundercats'; // eslint-disable-line
import classNames from 'classnames';
import OverLay from './OverLay.jsx';
import Links from './Links.jsx';

@createContainer({
  actions: 'navActions',
  map: ({ isSideNavOpen, links }) => ({
    links,
    open: isSideNavOpen
  }),
  store: 'navStore'
})
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  static displayName = 'SideNav'
  static propTypes = {
    links: PropTypes.array,
    navActions: PropTypes.object,
    open: PropTypes.bool
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this;
    return nextProps.links !== props.links ||
      nextProps.open !== props.open;
  }

  handleClick() {
    this.props.navActions.openSideNav(false);
  }

  render() {
    const { links, open } = this.props;

    const sideNavClass = classNames({
      'SideNav': true,
      'SideNav-close': !open
    });

    return (
      <div>
        <nav className={ sideNavClass }>
          <Links
            handleClick={ ::this.handleClick }
            links={ links } />
        </nav>
        <OverLay
          onClick={ ::this.handleClick }
          show={ open } />
      </div>
    );
  }
}
