var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin,

    Spinner = require('../common/Spinner');

var Sending = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    height: React.PropTypes.number
  },

  render: function() {
    return (
      <article
        ref='sending'
        style={{ height: this.props.height }}
        className='connect connect_sending'
        key='sending'>
        <Spinner
          svgClass='connect_sending-spinner'
          circleClass='connect_sending-path' />
      </article>
    );
  }
});

module.exports = Sending;
