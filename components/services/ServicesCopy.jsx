var React = require('react');

var Copy = React.createClass({
  displayName: 'Copy',

  propTypes: {
    title: React.PropTypes.string,
    content: React.PropTypes.string,
    imgSrc: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      title: 'empty title',
      content: 'empty content',
      imgSrc: ''
    };
  },

  render: function() {
    return (
      <article>
        <header>
          <img src={ this.props.imgSrc } />
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
