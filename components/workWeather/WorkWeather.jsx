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
            A proof-of-concept phone application. Built
            using Javascript, once, and works on all platforms - iOS, Android,
            and websites. The design is sleek and attractive.
          </p>
        </div>
      </article>
    );
  }
});

module.exports = WorkWeather;
