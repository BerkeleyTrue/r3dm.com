import React from 'react';

export default class extends React.Component {
  static displayName = 'Sent'
  static propTypes = { height: React.PropTypes.number }

  shouldComponentUpdate(nextProps) {
    return this.props.height !== nextProps.height;
  }

  render() {
    return (
      <article
        className='connect connect_sent'
        key='sent'
        style={{ height: this.props.height }}>
        <header className='connect_heading'>
          <h1>Thanks!</h1>
          <p>You should see an email from us soon.</p>
        </header>
      </article>
    );
  }
}
