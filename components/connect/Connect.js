var React = require('react'),
    tweenState = require('react-tween-state'),
    CSSTransitionGroup = React.addons.CSSTransitionGroup,
    debug = require('debug')('r3dm:components:connect'),

    // # mixins
    // PureRenderMixin = React.addons.PureRenderMixin,
    StateStreamMixin = require('../util/stateStreamMixin'),

    // # Components
    Sent = require('./ConnectSent'),
    ConnectError = require('./ConnectError'),
    Sending = require('./ConnectSending'),
    Form = require('./ConnectForm'),

    // # flux
    ConnectStore = require('./Store');

var Connect = React.createClass({displayName: "Connect",

  mixins: [
    tweenState.Mixin,
    StateStreamMixin
  ],

  getStateStream: function() {
    debug('setting up state stream');
    return ConnectStore
      .map(function(state) {
        return {
          sending: state.sending,
          sent: state.sent,
          error: state.error
        };
      });
  },

  componentDidMount: function() {
    var connect = this.refs.connect.getDOMNode();
    var form = this.refs.form.getDOMNode();
    this.setState({
      height: form.clientHeight,
      width: connect.clientWidth
    });
  },

  render: function() {
    var state = this.state,
        sending = state.sending,
        sent = state.sent,
        error = state.error,
        height = state.height;

    var sendingView = (
      React.createElement(Sending, {height: height })
    );
    var sentView = (
      React.createElement(Sent, {
        ref: "sent", 
        className: "connect", 
        height: height })
    );
    var errorView = (
      React.createElement(ConnectError, {
        ref: "error", 
        className: "connect", 
        height: height })
    );
    var formView = (
      React.createElement(Form, {ref: "form"})
    );

    return (
      React.createElement("section", {
        id: "connect", 
        ref: "connect", 
        style: { height: height}, 
        className: "connect_container"}, 

        React.createElement(CSSTransitionGroup, {
          component: "div", 
          transitionEnter: false, 
          transitionName: "connect_init"}, 
           !sent && !sending && !error ? formView : null
        ), 

        React.createElement(CSSTransitionGroup, {
          component: "div", 
          transitionName: "connect_sent"}, 
           sent ? sentView : null
        ), 

        React.createElement(CSSTransitionGroup, {
          component: "div", 
          transitionEnter: false, 
          transitionName: "connect_sending"}, 
           sending ? sendingView : null
        ), 

        React.createElement(CSSTransitionGroup, {
          component: "div", 
          transitionName: "connect_error"}, 
           error ? errorView : null
        )

      )
    );
  }
});

module.exports = Connect;
