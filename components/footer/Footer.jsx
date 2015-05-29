import React from 'react';

export default class extends React.Component {
  static displayName = 'Footer'

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <footer id='footer'>
        Copyright <span className='r3d'>&copy;</span> 2015 R3D M
      </footer>
    );
  }
}
