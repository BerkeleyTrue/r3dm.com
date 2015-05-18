var React = require('react'),
    WorkShpe = require('../workShpe/WorkShpe.jsx'),
    WorkWeather = require('../workWeather/WorkWeather.jsx');

var Work = React.createClass({
  displayName: 'Work',

  render: function() {
    return (
      <section
        className='work'
        id='work' >
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
