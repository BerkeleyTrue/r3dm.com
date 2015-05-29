import React from 'react';

export default class extends React.Component {
  constructor() { super(); }
  static displayName = 'Banner'

  render() {
    return (
      <section className='banner'>
        <img src='images/banner.png' />
      </section>
    );
  }
}
