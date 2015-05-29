import React from 'react';
import Copy from './ServicesCopy.jsx';

const copyData = [{
  title: 'STRATEGY',
  content: `We know technology and what it can do for businesses. We help
  companies leverage websites, mobile, SEO, online ads and content
  marketing to help you succeed.`,
  imgSrc: '/images/icon-strategy.png'
}, {
  title: 'DESIGN',
  content: `Our apps communicate trust. We are experts in User Interface
  and User Experience design. Whether it's giving a website makeover or
  coming up with totally unique solutions.`,
  imgSrc: '/images/icon-design.png'
}, {
  title: 'DEVELOPMENT',
  content: `At our core we are tech - Testing, API Design,
  Isomorphic Apps. We deliver your product along with a copy of the
  source. Your software goes where you go.`,
  imgSrc: '/images/icon-develop.png'
}];

export default class extends React.Component {
  constructor() {
    super();
  }
  static displayName = 'Services'

  shouldComponentUpdate() {
    return false;
  }

  renderCopy(copy) {
    return copy.map(_copy => {
      return (
        <Copy
          content={ _copy.content }
          imgSrc={ _copy.imgSrc }
          key={ _copy.title }
          title={ _copy.title }/>
      );
    });
  }

  render() {
    return (
      <section
        className='services'
        id='services'>
        <header className='services_subject-center services_heading'>
          <h2>SERVICES</h2>
        </header>
        <div className='services_content'>
          { this.renderCopy(copyData) }
        </div>
      </section>
    );
  }
}
