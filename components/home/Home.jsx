var React = require('react/addons'),
    // debug = require('debug')('r3dm:comp:home'),

    // # Components
    Team = require('../team'),
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
              <p>
                We specialize in delivering professional Web and Mobile
                experiences to our customers
              </p>
            </header>
          </div>
        </section>
        <Services />
        <Work />
        <Team />
        <Connect />
      </main>
    );
  }
});

module.exports = Home;
