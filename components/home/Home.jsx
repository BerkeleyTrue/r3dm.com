var React = require('react/addons'),

    // # mixins
    // scrollMix = require('react-scroll-components').ScrollListenerMixin,
    PureRender = React.addons.PureRenderMixin,

    // # Components
    Banner = require('../banner'),
    Logo = require('../logo'),
    Work = require('../work'),
    Connect = require('../connect');

var Home = React.createClass({
  mixins: [PureRender],
  render: function() {

    return (
      <div className="main-app">
        <div className="logo-container">
          <Logo />
        </div>
        <div className="first-con">
          <Banner />
          <div className="first-con_bot">
            <h2>
              We build fast, data-rich, offline capable websites that bring
              the future to your users.
            </h2>
          </div>
        </div>
        <Work />
        <Connect />
      </div>
    );
  }
});

module.exports = Home;
