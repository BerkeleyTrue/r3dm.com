import React from 'react';

export default class extends React.Component {
  constructor() { super(); }
  static displayName = 'Spinner'
  static propTypes = {
    svgClass: React.PropTypes.string,
    circleClass: React.PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    return this.props.svgClass !== nextProps.svgClass ||
      this.props.circleClass !== nextProps.circleClass;
  }

  render() {
    return (
      <svg
        className={ this.props.svgClass }
        height='65px'
        viewBox='0 0 66 66'
        width='65px'
        xmlns='http://www.w3.org/2000/svg'>
        <circle
          className={ this.props.circleClass }
          cx='33'
          cy='33'
          fill='none'
          r='30'
          strokeLinecap='round'
          strokeWidth='12'>
        </circle>
      </svg>
    );
  }
}
