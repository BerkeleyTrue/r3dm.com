var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin;

var Sent = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: { height: React.PropTypes.number },

  render: function() {
    return (
      <article
        style={{ height: this.props.height }}
        className='connect connect_sent'
        key='sent'>
        <header className='connect_heading'>
          <h1>Thanks!</h1>
          <p>You should see an email from us soon.</p>
        </header>
      </article>
    );
  }
});

module.exports = Sent;
