var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin;

var Sent = React.createClass({displayName: "Sent",
  mixins: [PureRenderMixin],

  propTypes: { height: React.PropTypes.number },

  render: function() {
    return (
      React.createElement("article", {
        style: { height: this.props.height}, 
        className: "connect connect_sent", 
        key: "sent"}, 
        React.createElement("header", {className: "connect_heading"}, 
          React.createElement("h1", null, "Thanks!"), 
          React.createElement("p", null, "You should see an email from us soon.")
        )
      )
    );
  }
});

module.exports = Sent;
