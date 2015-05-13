import React from 'react';

export default React.createClass({
  displayName: 'Sent',
  propTypes: { height: React.PropTypes.number },

  shouldComponentUpdate(nextProps) {
    return this.props.height !== nextProps.height;
  },

  render: function() {
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
});
