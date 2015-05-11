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
            We teamed up with the Society of Hispanic Professional Engineers of San
            Francisco to makover their public face. We made the site mobile so
            visitors could learn more about SHPE right from a smartphone. In the
            process, we were able to save the non-profit money by utilizing
            hosting plans available for small businesses.
          </p>
        </div>
      </article>
    );
  }
});

module.exports = WorkWeather;
