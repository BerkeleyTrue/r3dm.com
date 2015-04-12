var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin,

    Copy = require('./ServicesCopy.jsx');

var Services = React.createClass({
  mixins: [PureRenderMixin],

  _renderCopy: function(copy) {
    return copy.map(function(_copy) {
      return (
        <Copy
          key={ _copy.title }
          title={ _copy.title }
          content={ _copy.content }
          imgSrc={ _copy.imgSrc } />
      );
    });
  },

  render: function() {
    var copyData = [{
      title: 'STRATEGY',
      content: `We are digital problem solvers. We investigate your problem
      beyond just what appears on a screen. To identify what are the true
      painpoints our customers are feeling. Your company may have been
      successful before the tech era. We can make sure it continues to excel
      into the future. By teaching you how to leverage social media, online ads
      and orient your business in the digital age.
        `,
      imgSrc: '/images/icon-strategy.png'
    }, {
      title: 'DESIGN',
      content: `Our apps communicate trust. We defer to User Interface
      and User Experience Desginers to build the experiences that customers
      expect from us. Bring your own design or have us work with you to
      develop the experience that best matches your business objectives.
      `,
      imgSrc: '/images/icon-design.png'
    }, {
      title: 'DEVELOPMENT',
      content: `Behind the scenes we are the best in technology. Our engineers
      folow and establish the best practices in the field - Testing, API Design,
      Isomorphic Apps. When we deliver your product you have a copy of all the
      software. Increasing the trust you can place in us. Your software can go
      anywhere.
      `,
      imgSrc: '/images/icon-develop.png'
    }];

    return (
      <section
        id='services'
        className='services'>
        <header className='services_subject-center services_heading'>
          <h2>SERVICES</h2>
        </header>
        <div className='services_content'>
            { this._renderCopy(copyData) }
        </div>
      </section>
    );
  }
});

module.exports = Services;
