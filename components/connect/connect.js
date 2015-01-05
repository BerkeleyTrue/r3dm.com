var React = require('react'),
    globular = require('../globular'),
    debug = require('debug')('r3dm:connect'),
    connect = require('./connect.action'),
    routerhistory = require('../common/history.action');

var Connect = React.createClass({displayName: "Connect",
  getInitialState: function() {
    return {
      email: '',
      name: ''
    };
  },

  componentDidMount: function() {
    connect.complete.subscribeOnNext(function(data) {
      debug('Email Success: ', data);
      debug('Redirecting...');
      routerhistory.action('connected');
    });

    connect.complete.subscribeOnError(function(err) {
      return debug('Error sending email', err);
    });
  },

  onEmailChange: function(e) {
    this.setState({ email: e.target.value });
  },

  onNameChange: function(e) {
    this.setState({ name: e.target.value });
  },

  handleConnect: function(e) {
    var email = this.state.email,
        name = this.state.name;

    e.preventDefault();

    if (!email || !name) {
      return;
    }

    debug('Connect Action');
    connect.action({
      email: this.state.email,
      name: this.state.name
    });


    // submit event to Google Analytics to measure conversion goals
    globular.ga('send', 'event', 'button', 'click', 'Connect');
    console.log('ga is', globular.ga);
  },

  render: function() {
    var email = this.state.email,
        name = this.state.name;

    return (
      React.createElement("div", {id: "connect", className: "connect"}, 
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
                    onChange:  this.onNameChange, 
                    placeholder: "your name"})
              ), 
              React.createElement("div", {className: "connect_email"}, 
                React.createElement("div", null, 
                  React.createElement("input", {
                    type: "email", 
                    name: "email", 
                    className: "connect_input", 
                    value: email, 
                    onChange:  this.onEmailChange, 
                    placeholder: "email"})
                ), 
                React.createElement("div", {
                  className: "button", 
                  onClick:  this.handleConnect}, 
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
  }
});

module.exports = Connect;
