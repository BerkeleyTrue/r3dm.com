var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin,

    Spinner = require('../common/Spinner');

var Sending = React.createClass({displayName: "Sending",
  mixins: [PureRenderMixin],

  propTypes: {
    height: React.PropTypes.number
  },

  render: function() {
    return (
      React.createElement("article", {
        ref: "sending", 
        style: { height: this.props.height}, 
        className: "connect connect_sending", 
        key: "sending"}, 
        React.createElement(Spinner, {
          svgClass: "connect_sending-spinner", 
          circleClass: "connect_sending-path"})
      )
    );
  }
});

module.exports = Sending;
