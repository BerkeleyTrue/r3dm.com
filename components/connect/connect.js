/** @jsx React.DOM */
'use strict';
var React = require('react'),
    //debug = require('debug')('r3dm:connect:element'),
    mandrillAction = require('./connect.action.js');

var Connect = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      name: ''
    };
  },

  onEmailChange: function(e) {
    this.setState({email: e.target.value });
  },

  handleConnect: function(e) {
    e.preventDefault();
    mandrillAction.onNext({
      email: this.state.email,
      name: 'berkeley'
    });
  },

  render: function() {
    var email = this.state.email;

    return (
      <div className = 'connect'>
        <div className = 'connect_heading'>
          <h2>CONNECT</h2>
        </div>

        <div className = 'connect_email'>
          <div>
            <form
              action = ''
              className = 'pure-form'
              onSubmit = { this.handleConnect }>
              <div>
                <input
                  type = 'email'
                  name = 'email'
                  className = 'connect_input'
                  value = { email }
                  onChange = { this.onEmailChange }
                  placeholder = 'email'/>
              </div>
              <div
                className = 'button'
                onClick = { this.handleConnect }>
                <span>
                  Connect
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Connect;
