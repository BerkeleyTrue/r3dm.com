import React from 'react';

export default class extends React.Component {
  static displayName = 'FourOhFour'

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <section className='notFound'>
        <div className='notFound_layout'>
          <div className='notFound_main'>
            <header>
              <h1>404</h1>
              <p>Page Not Found</p>
            </header>
            <div className='notFound_desc'>
              Sorry, this is not the page you are looking for.
            </div>
          </div>
        </div>
      </section>
    );
  }
}
