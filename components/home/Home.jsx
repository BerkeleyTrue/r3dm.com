var React = require('react/addons'),
    // debug = require('debug')('r3dm:comp:home'),

    // # Components
    About = require('../about'),
    Banner = require('../banner'),
    Logo = require('../logo'),
    Services = require('../services'),
    Work = require('../work'),
    Connect = require('../connect');

var Home = React.createClass({

  render: function() {

    return (
      <main className="main-app">
        <div className="logo-container">
          <div className='v-center'>
            <div>
              <Logo logoClass='logo'/>
            </div>
          </div>
        </div>
        <section className="first-con">
          <Banner />
          <div className="first-con_bot">
            <header>
              <div>
                We build fast, data-rich, offline capable websites that bring
                the future to your users.
              </div>
            </header>
          </div>
        </section>
        <Services />
        <Work />
        <About />
        <Connect />
      </main>
    );
  }
});

module.exports = Home;
