var React = require('react'),
    CSSTransitionGroup = React.addons.CSSTransitionGroup,
    { StateStreamMixin } = require('rx-react'),

    globular = require('../globular'),
    debug = require('debug')('r3dm:components:connect'),

    ConnectActions = require('./Actions'),
    ConnectStore = require('./Store');

var Connect = React.createClass({displayName: "Connect",

  mixins: [StateStreamMixin],

  _onEmailChange: ConnectActions.onEmailChange,
  _onNameChange: ConnectActions.onNameChange,

  getStateStream: function() {
    debug('setting up state stream');
    return ConnectStore;
  },

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
    var {
      email,
      name,
      sending,
      sent,
      error
    } = this.state;
    var view = [];
    if (!sending && !error && !sent) {
      view.push(
        React.createElement("div", {id: "connect", className: "connect", key: "init"}, 
          React.createElement("div", {className: "connect_heading"}, 
            React.createElement("h2", null, "Work With Us.")
          ), 
          React.createElement("div", {className: "connect_form"}, 
            React.createElement("div", null, 
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
        )
      );
    } else if (sending) {
      view.push(
        React.createElement("div", {key: "sending"})
      );
    } else if (sent) {
      view.push(
        React.createElement("span", {key: "sent"}, "Email sent")
      );
    } else {
      view.push(
        React.createElement("span", {key: "error"}, "Error")
      );
    }

    return (
      React.createElement(CSSTransitionGroup, {transitionName: "connect"}, 
        view 
      )
    );
  }
});

module.exports = Connect;
