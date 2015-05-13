var React = require('react/addons');

var WorkWeather = React.createClass({

  render: function() {

    return (
      <article id="work_weather_article">
        <div id="work_weather_img-wrapper">
          <img
            id='work-weather-img'
            src={'images/work_weather_app.jpg'}
          />
        </div>
        <div id="work_weather_copy">
          <h3>R3DM Weather</h3>
          <p>
            A proof-of-concept phone application. After evaluating consumer
            needs, this app was designed as an informative and attractive way to
            check the weather. The minimal design allows the user to easily find
            data on current and future weather forecasts, sunrise and sunset,
            moon phases, and more.
          </p>
        </div>
      </article>
    );
  }
});

module.exports = WorkWeather;
