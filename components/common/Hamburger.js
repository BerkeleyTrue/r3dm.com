var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin;

var Hamburger = React.createClass({displayName: "Hamburger",
  mixins: [PureRenderMixin],

  render: function() {
    return (
      React.createElement("svg", React.__spread({}, 
         this.props , 
        {xmlns: "http://www.w3.org/2000/svg", 
        width: "48", 
        height: "48", 
        viewBox: "0 0 48 48"}), 
        React.createElement("path", {d: "M0 0h48v48h-48z", fill: "none"}), 
        React.createElement("path", {d: "M6 36h36v-4h-36v4zm0-10h36v-4h-36v4zm0-14v4h36v-4h-36z"})
      )
    );
  }
});
module.exports = Hamburger;
