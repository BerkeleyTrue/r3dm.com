var React = require('react/addons'),
    // debug = require('debug')('r3dm:comp:home'),

    // # Components
    Banner = require('../banner'),
    Logo = require('../logo'),
    Work = require('../work'),
    Connect = require('../connect');

var Home = React.createClass({

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
