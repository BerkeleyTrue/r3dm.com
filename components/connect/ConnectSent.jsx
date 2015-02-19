var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin;

var Sent = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    style: React.PropTypes.object,
    sendClass: React.PropTypes.string
  },

  render: function() {
    return (
      <article
        style={ this.props.style }
        className={ this.props.className }
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
