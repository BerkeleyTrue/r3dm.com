var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin;

var Copy = React.createClass({displayName: "Copy",
  mixins: [PureRenderMixin],

  propTypes: {
    title: React.PropTypes.string,
    content: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      title: 'empty title',
      content: 'empty content'
    };
  },

  render: function() {
    return (
      React.createElement("article", null, 
        React.createElement("header", null, 
          React.createElement("h3", null,  this.props.title)
        ), 
        React.createElement("p", null, 
           this.props.content
        )
      )
    );
  }
});

module.exports = Copy;
