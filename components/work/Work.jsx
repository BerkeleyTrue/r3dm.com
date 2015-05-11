var React = require('react/addons'),
    WorkShpe = require('../workShpe/WorkShpe.jsx'),
    WorkWeather = require('../workWeather/WorkWeather.jsx');

var Work = React.createClass({

  render: function() {
    return (
      <section
        id='work'
        className='work'
        >
        <header className='work_heading'>
          <h2>RECENT WORK</h2>
        </header>
        <div className='work_content' >
          <WorkShpe />
          <WorkWeather />
        </div>
      </section>
    );
  }
});

module.exports = Work;
