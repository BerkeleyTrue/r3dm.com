import React, { PropTypes } from 'react';
import { Container } from 'thundercats';
import tweenState from 'react-tween-state';
import CSSTransitionGroup from 'React/lib/CSSTransitionGroup';

import Sent from './ConnectSent.jsx';
import ConnectError from './ConnectError.jsx';
import Sending from './ConnectSending.jsx';
import Form from './ConnectForm.jsx';

export default React.createClass({
  mixins: [tweenState.Mixin],
  displayName: 'Connect',

  propTypes: {
    sending: PropTypes.bool,
    sent: PropTypes.bool,
    error: PropTypes.bool
  },

  getThundercats: function() {
    return {
      store: 'connectStore',
      map: ({ sending, sent, error }) => ({
        sending,
        sent,
        error
      })
    };
  },

  componentDidMount: function() {
    const connect = this.refs.connect.getDOMNode();
    const form = this.refs.form.getDOMNode();
    this.setState({ // eslint-disable-line
      height: form.clientHeight,
      width: connect.clientWidth
    });
  },

  render: function() {
    const { height } = this.state;
    const {
      sending,
      sent,
      error
    } = this.props;

    const sendingView = (
      <Sending height={ height }/>
    );
    const sentView = (
      <Sent
        className='connect'
        height={ height }
        ref='sent'/>
    );
    const errorView = (
      <ConnectError
        className='connect'
        height={ height }
        ref='error'/>
    );
    const formView = (
      <Container>
        <Form ref='form' />
      </Container>
    );

    return (
      <section
        className='connect_container'
        id='connect'
        ref='connect'
        style={{ height: height }}>

        <CSSTransitionGroup
          component='div'
          transitionEnter={ false }
          transitionName='connect_init'>
          { !sent && !sending && !error ? formView : null }
        </CSSTransitionGroup>

        <CSSTransitionGroup
          component='div'
          transitionName='connect_sent'>
          { sent ? sentView : null }
        </CSSTransitionGroup>

        <CSSTransitionGroup
          component='div'
          transitionEnter={ false }
          transitionName='connect_sending'>
          { sending ? sendingView : null }
        </CSSTransitionGroup>

        <CSSTransitionGroup
          component='div'
          transitionName='connect_error'>
          { error ? errorView : null }
        </CSSTransitionGroup>

      </section>
    );
  }
});
