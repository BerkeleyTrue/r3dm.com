var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin;

var Sent = React.createClass({displayName: "Sent",
  mixins: [PureRenderMixin],

  propTypes: {
    style: React.PropTypes.object,
    sendClass: React.PropTypes.string
  },

  render: function() {
    return (
      React.createElement("article", {
        style:  this.props.style, 
        className:  this.props.className, 
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
