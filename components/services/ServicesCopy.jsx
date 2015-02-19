var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin;

var Copy = React.createClass({
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
      <article>
        <header>
          <h3>{ this.props.title }</h3>
        </header>
        <p>
          { this.props.content}
        </p>
      </article>
    );
  }
});

module.exports = Copy;
