var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin,

    Copy = require('./ServicesCopy');

var Services = React.createClass({
  mixins: [PureRenderMixin],

  _renderCopy: function(copy) {
    return copy.map(function(_copy) {
      return (
        <Copy
          key={ _copy.title }
          title={ _copy.title }
          content={ _copy.content} />
      );
    });
  },

  render: function() {
    var copyData = [{
      title: 'Node.js',
      content: `We build fast and scalable applications using Node.js.
        Why Node.js? Node.js allows you to serve simultaneous requests
        increasing the performance without the need to use caching
        services. This means you can serve more of your users with less
        infrastructure`
    }, {
      title: 'React.js',
      content: `Using isomorphic Javascript with React.js means users without
        Javascript can still load a basic version of your site, while those
        with will be delivered a beautifully fast and rich experience
      `
    }, {
      title: 'API Development',
      content: `We deliver fast and secure API servers that can be used to feed
        your mobile users all the data they crave. We build our api's to be
        easily updated and extended
      `
    }, {
      title: 'MVP Creation',
      content: `From idea to MVP, we take your early stage startup and deliver
        an impressive minimal viable product that can easily scale to fit your
        user base
      `
    }, {
      title: 'Mobile Developement',
      content: `We build our apps to respond to any environment, whether that
        is Android or iOS, Windows or OSX. We build our mobile experience to
        contain realistic motion to give your users an intutive experience they
        can feel as well as see.
      `
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
