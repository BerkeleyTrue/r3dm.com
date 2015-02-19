var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin;

var ConnectError = React.createClass({displayName: "ConnectError",
  mixins: [PureRenderMixin],

  propTypes: { style: React.PropTypes.object },

  render: function() {
    return (
      React.createElement("article", {
        style:  this.props.style, 
        className: "connect connect_error", 
        key: "error"}, 
        React.createElement("h1", null, "Opps"), 
        React.createElement("p", null, "Something went wrong...")
      )
    );
  }
});

module.exports = ConnectError;
