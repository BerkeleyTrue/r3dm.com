var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin;

var ConnectError = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: { style: React.PropTypes.object },

  render: function() {
    return (
      <article
        style={ this.props.style }
        className='connect connect_error'
        key='error'>
        <h1>Opps</h1>
        <p>Something went wrong...</p>
      </article>
    );
  }
});

module.exports = ConnectError;
