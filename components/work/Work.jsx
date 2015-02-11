var React = require('react/addons'),
    ImgLoader = require('react-imageloader'),
    PureRender = React.addons.PureRenderMixin;

var Spinner = React.createClass({
  render: function() {
    return (
      <svg
        className="connect_sending-spinner"
        width="65px"
        height="65px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          className="connect_sending-path"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30">
        </circle>
      </svg>
    );
  }
});

var Work = React.createClass({
  mixins: [PureRender],

  render: function() {

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
                Moving away from the tired world of PHP.
                In the process, we were able to save this non-profit money in
                the long-run by utilizing hosting plans available for small
                companies using Node.js.
              </p>
            </div>
            <div className='work_img'>
              <ImgLoader
                src='images/mocks/ipad_iphone_portrait.png'
                wrapper={ React.DOM.div }
                preloader={ React.createFactory(Spinner) }/>
            </div>
          </article>
        </div>
      </section>
    );
  }
});

module.exports = Work;
