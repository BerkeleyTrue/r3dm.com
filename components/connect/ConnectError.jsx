import React from 'react';

export default class extends React.Component {
  static displayName = 'ConnectError'

  static propTypes = { height: React.PropTypes.number }

  shouldComponentUpdate(nextProps) {
    return nextProps.height !== this.props.height;
  }

  render() {
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
}
