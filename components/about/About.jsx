import React from 'react';

export default class extends React.Component {
  constructor() {
    super();
  }

  static displayName = 'About'
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <section
        className='about'
        id='about'>
        <div className='about_content'>
          <header>
            <h2>About R3DM</h2>
          </header>
          <p>
            We are a group of developers and designers who are looking for
            exciting new ideas to build and express our creativity. We build
            using Node.js and the latest technologies to deliver a fast and
            beautiful experience to users.
            <br />
            <br />
            Need an MVP? Need an API that can scale to enterprise level? Want
            to use the latest in React.js tech? Reach out and
            lets build something together!
          </p>
        </div>
      </section>
    );
  }
}
