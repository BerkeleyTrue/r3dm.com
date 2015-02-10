var React = require('react/addons'),

    // # mixins
    StateStreamMixin = require('../util/StateStreamMixin'),
    ScrollMixin = require('../util/scrollMixin'),
    PureRender = React.addons.PureRenderMixin,

    // # Components
    Banner = require('../banner'),
    Logo = require('../logo'),
    Work = require('../work'),
    Connect = require('../connect'),

    HomeActions = require('./Actions'),
    HomeStore = require('./Store');

var Home = React.createClass({
  mixins: [
    PureRender,
    ScrollMixin,
    StateStreamMixin
  ],

  getStateStream: function() {
    return HomeStore;
  },

  componentDidMount: function() {
    var win = typeof window !== 'undefined' ? window : false;
    HomeActions.setWindowHeight(win.innerHeight);
  },

  setScroll: HomeActions.setScroll,
  setIsScrolling: HomeActions.setIsScrolling,

  render: function() {

    return (
      <main className="main-app">
        <div className="logo-container">
          <Logo />
        </div>
        <section className="first-con">
          <Banner />
          <div className="first-con_bot">
            <header>
              <p>
                We build fast, data-rich, offline capable websites that bring
                the future to your users.
              </p>
            </header>
          </div>
        </section>
        <Work />
        <Connect />
      </main>
    );
  }
});

module.exports = Home;
