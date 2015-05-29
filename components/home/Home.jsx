import React from 'react';

import Team from '../team';
import Banner from '../banner';
import Logo from '../logo';
import Services from '../services';
import { Work } from '../work';
import Connect from '../connect';
import Email from '../email';

export default class extends React.Component {
  constructor() { super(); }
  static displayName = 'Home'

  render() {
    return (
      <main className='main-app'>
        <div className='logo-container'>
          <div className='v-center'>
            <div>
              <Logo logoClass='logo'/>
            </div>
          </div>
        </div>
        <section className='first-con'>
          <Banner />
          <div className='first-con_bot'>
            <header>
              <p>
                We deliver Web and Mobile
                experiences to our Customers.
              </p>
            </header>
          </div>
        </section>
        <Services />
        <Work />
        <Team />
        <Connect />
        <Email />
      </main>
    );
  }
}
