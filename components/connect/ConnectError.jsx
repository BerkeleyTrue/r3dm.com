var React = require('react');

var ConnectError = React.createClass({
  displayName: 'ConnectError',

  propTypes: { height: React.PropTypes.number },

  shouldComponentUpdate(nextProps) {
    return nextProps.height !== this.props.height;
  },

  render: function() {
    return (
      <article
        className='connect connect_error'
        key='error'
        style={{ height: this.props.height }}>
        <h1>Opps</h1>
        <p>Something went wrong...</p>
      </article>
    );
  }
});

module.exports = ConnectError;
