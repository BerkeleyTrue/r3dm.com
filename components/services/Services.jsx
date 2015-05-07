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
      content: `We know technology and what it can do for businesses. We help
      companies leverage websites, mobile,
      SEO, online ads and content marketing to help you succeed.
        `,
      imgSrc: '/images/icon-strategy.png'
    }, {
      title: 'DESIGN',
      content: `Our apps communicate trust. We are experts in User Interface
      and User Experience design. Whether it's giving a website makeover or
      coming up with totally unique solutions.
      `,
      imgSrc: '/images/icon-design.png'
    }, {
      title: 'DEVELOPMENT',
      content: `At our core we are tech - Testing, API Design,
      Isomorphic Apps. We deliver your product along with a copy of the
      source. Your software goes where you go.
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
