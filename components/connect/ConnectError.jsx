var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin;

var ConnectError = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: { height: React.PropTypes.number },

  render: function() {
    return (
      <article
        style={{ height: this.props.height }}
        className='connect connect_error'
        key='error'>
        <h1>Opps</h1>
        <p>Something went wrong...</p>
      </article>
    );
  }
});

module.exports = ConnectError;
