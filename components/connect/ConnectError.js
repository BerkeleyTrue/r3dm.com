var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin;

var ConnectError = React.createClass({displayName: "ConnectError",
  mixins: [PureRenderMixin],

  propTypes: { height: React.PropTypes.number },

  render: function() {
    return (
      React.createElement("article", {
        style: { height: this.props.height}, 
        className: "connect connect_error", 
        key: "error"}, 
        React.createElement("h1", null, "Opps"), 
        React.createElement("p", null, "Something went wrong...")
      )
    );
  }
});

module.exports = ConnectError;
