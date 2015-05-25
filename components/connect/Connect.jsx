import React, { PropTypes } from 'react';
import { createContainer } from 'thundercats';
import tweenState from 'react-tween-state';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import Sent from './ConnectSent.jsx';
import ConnectError from './ConnectError.jsx';
import Sending from './ConnectSending.jsx';
import Form from './ConnectForm.jsx';

export default createContainer(
  {
    store: 'connectStore',
    map: ({ sending, sent, error }) => ({
      sending,
      sent,
      error
    })
  },
  React.createClass({
    mixins: [tweenState.Mixin],
    displayName: 'Connect',

    propTypes: {
      sending: PropTypes.bool,
      sent: PropTypes.bool,
      error: PropTypes.bool
    },

    componentDidMount: function() {
      const connect = React.findDOMNode(this.refs.connect);
      const form = React.findDOMNode(this.refs.form);
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
        <Form ref='form' />
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
  })
);
