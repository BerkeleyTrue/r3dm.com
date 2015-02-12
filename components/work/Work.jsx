var React = require('react/addons'),

    // # mixins
    PureRender = React.addons.PureRenderMixin,

    // # components
    Spinner = require('../common/Spinner'),
    ImgLoader = require('react-imageloader');

var Work = React.createClass({
  mixins: [PureRender],

  render: function() {

    // create factory with props
    var spinner = React.createElement.bind(null, Spinner, {
      svgClass: 'connect_sending-spinner',
      circleClass: 'connect_sending-path'
    });

    return (
      <section className="work">
        <header className = "work_heading">
          <h2>Our Work</h2>
        </header>
        <div className = "work_content" >
          <article>
            <div className='work_copy'>
              <header>
                <h3>SHPE</h3>
                <p>San Francisco Bay Area</p>
              </header>
              <p>
                We teamed up with the Society Of Hispanic Professional
                Engineers - San Francisco Bay Area chapter to bring their
                public face up-to-date with Node.js and MongoDb.
                In the process, we were able to save this non-profit money in
                the long-run by utilizing hosting plans available for small
                companies using Node.js.
              </p>
            </div>
            <div className='work_img'>
              <ImgLoader
                src='images/mocks/ipad_iphone_portrait.png'
                wrapper={ React.DOM.div }
                preloader={ spinner }/>
            </div>
          </article>
        </div>
      </section>
    );
  }
});

module.exports = Work;
