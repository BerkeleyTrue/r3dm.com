var React = require('react/addons'),

    // # mixins
    scrollMix = require('react-scroll-components').ScrollListenerMixin,

    // # Components
    Banner = require('../banner'),
    Logo = require('../logo'),
    Connect = require('../connect');

var Home = React.createClass({
  mixins: [scrollMix],
  render: function() {

    return (
      <div className="main-app">
        <div className="logo-container">
          <Logo></Logo>
        </div>
        <div className="first-con">
          <Banner></Banner>
          <div className="first-con_bot">
            <h2>
              We build fast, data-rich, offline capable websites that bring
              the future to your users.
            </h2>
          </div>
        </div>
        <Connect />
      </div>
    );
  }
});

module.exports = Home;
