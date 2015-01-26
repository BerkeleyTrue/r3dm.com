var Rx = require('rx'),
    React = require('react'),
    CSSTransitionGroup = React.addons.CSSTransitionGroup,
    PureRenderMixin = React.addons.PureRenderMixin,

    StateStreamMixin = require('rx-react').StateStreamMixin,

    globular = require('../globular'),
    debug = require('debug')('r3dm:components:connect'),

    ConnectActions = require('./Actions'),
    ConnectStore = require('./Store');

var Sent = React.createClass({displayName: "Sent",

  mixins: [PureRenderMixin],

  render: function() {
    return (
      React.createElement("div", {
        style:  this.props.style, 
        className:  this.props.className, 
        key: "sent"}, 
        React.createElement("h1", null, "Thanks!"), 
        React.createElement("p", null, "You should see an email from us soon.")
      )
    );
  }
});

var Connect = React.createClass({displayName: "Connect",

  mixins: [StateStreamMixin],

  getStateStream: function() {
    debug('setting up state stream');
    return Rx.Observable.combineLatest(
      ConnectStore,
      this._compHeightAction,
      function(state, height) {
        state.height = height;
        return state;
      }
    );
  },

  componentDidMount: function() {
    var connectForm = this.refs.form.getDOMNode();

    this._compHeightAction.onNext(connectForm.clientHeight);
  },

  _onEmailChange: ConnectActions.onEmailChange,
  _onNameChange: ConnectActions.onNameChange,
  _compHeightAction: new Rx.BehaviorSubject(false),

  // TODO: turn this to a single action
  _handleConnect: function(e) {
    var email = this.state.email,
        name = this.state.name;

    e.preventDefault();

    if (!email || !name) {
      return;
    }

    debug('send connect action');
    ConnectActions.send({
      email: email,
      name: name
    });

    // submit event to Google Analytics to measure conversion goals
    globular.ga('send', 'event', 'button', 'click', 'Connect');
  },

  render: function() {
    var state = this.state,
        email = state.email,
        name = state.name,
        sending = state.sending,
        sent = state.sent,
        error = state.error,
        height = state.height;

    var style = {
      height: height + 'px'
    };

    var sendingView = (
      React.createElement("div", {
        ref: "sending", 
        style: style, 
        className: "connect connect_sending", 
        key: "sending"}, 
        React.createElement("svg", {
          className: "connect_sending-spinner", 
          width: "65px", 
          height: "65px", 
          viewBox: "0 0 66 66", 
          xmlns: "http://www.w3.org/2000/svg"}, 
          React.createElement("circle", {
            className: "connect_sending-path", 
            fill: "none", 
            strokeWidth: "6", 
            strokeLinecap: "round", 
            cx: "33", 
            cy: "33", 
            r: "30"}
          )
        )
      )
    );
    var sentView = (
      React.createElement(Sent, {
        ref: "sent", 
        className: "connect", 
        style: style })
    );
    var errorView = (
      React.createElement("span", {
        style: style, 
        className: "connect connect-error", 
        key: "error"}, "Error")
    );
    var formView = (
      React.createElement("div", {
        className: "connect", 
        key: "init", 
        ref: "form"}, 
        React.createElement("div", {className: "connect_heading"}, 
          React.createElement("h2", null, "Work With Us.")
        ), 
        React.createElement("div", {className: "connect_form"}, 
          React.createElement("form", {
            action: "", 
            className: "pure-form", 
            onSubmit:  this.handleConnect}, 
            React.createElement("div", {className: "connect_name"}, 
                React.createElement("input", {
                  type: "text", 
                  name: "name", 
                  className: "connect_input", 
                  value: name, 
                  onChange:  this._onNameChange, 
                  placeholder: "your name"})
            ), 
            React.createElement("div", {className: "connect_email"}, 
              React.createElement("div", null, 
                React.createElement("input", {
                  type: "email", 
                  name: "email", 
                  className: "connect_input", 
                  value: email, 
                  onChange:  this._onEmailChange, 
                  placeholder: "email"})
              ), 
              React.createElement("div", {
                className: "button", 
                onClick:  this._handleConnect}, 
                React.createElement("span", null, 
                  "Connect"
                )
              )
            )
          )
        )
      )
    );

    return (
      React.createElement("div", {
        id: "connect", 
        style: style, 
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
          transitionName: "connect_sending"}, 
           sending ? sendingView : null
        ), 
        React.createElement(CSSTransitionGroup, {
          component: "div", 
          transitionName: "connect_sending"}, 
           error ? errorView : null
        )
      )
    );
  }
});

module.exports = Connect;
