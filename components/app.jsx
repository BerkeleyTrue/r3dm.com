var React = require('react/addons'),

    // # mixins
    scrollMix = require('react-scroll-components').ScrollListenerMixin,

    // # Components
    Nav = require('./nav'),
    Banner = require('./banner'),
    Logo = require('./logo'),
    Connect = require('./connect'),
    Footer = require('./footer');

var App = React.createClass({
  mixins: [scrollMix],
  render: function() {

    return (
      <div className="main-app">
        <Nav></Nav>
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
        <Connect></Connect>
        <Footer />
      </div>
    );
  }
});

module.exports = App;
