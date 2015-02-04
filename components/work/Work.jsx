var React = require('react/addons'),
    PureRender = React.addons.PureRenderMixin;

var Work = React.createClass({
  mixins: [PureRender],

  render: function() {

    return (
      <section className="work">
        <header className = "work_heading">
          <h2>Our Work</h2>
        </header>
        <div className = "work_content" >
          <article>
            <div className='work_copy'>
              <header>
                <h3>Society of Professional Hispanic Engineers</h3>
                <p>San Francisco Bay Area</p>
              </header>
              <p>
                Open your heart's eyes. Empty your mind;
                be formless, shapeless like water. Anxiety
                and panic will pass. Live life one inhalation
                and one exhalation at a time. Watch each breath
                appear and disappear, just breathing.
                Bring love into your heart, into your
                breath and into your being.
              </p>
            </div>
            <div className='work_img'>
              Image
            </div>
          </article>
        </div>
      </section>
    );
  }
});

module.exports = Work;
