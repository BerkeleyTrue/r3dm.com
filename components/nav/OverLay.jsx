import React from 'react';
import classNames from 'classnames';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  static displayName = 'OverLay'
  static propTypes = {
    show: React.PropTypes.bool
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show;
  }

  render() {
    const OverLayClass = classNames({
      'SideNav_overlay': true,
      'SideNav_overlay-show': this.props.show
    });

    return (
      <div className={ OverLayClass } {...this.props }/>
    );
  }
}
