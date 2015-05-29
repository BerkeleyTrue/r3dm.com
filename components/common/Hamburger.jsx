import React from 'react';
import shallowEqual from 'react/lib/shallowEqual';

export default class extends React.Component {
  constructor() { super(); }
  static displayName = 'Hamburger'

  shouldComponentUpdate(nextProps) {
    return shallowEqual(this.props, nextProps);
  }

  render() {
    return (
      <svg
        { ...this.props }
        height='48'
        viewBox='0 0 48 48'
        width='48'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M0 0h48v48h-48z' fill='none'/>
        <path d='M6 36h36v-4h-36v4zm0-10h36v-4h-36v4zm0-14v4h36v-4h-36z'/>
      </svg>
    );
  }
}
