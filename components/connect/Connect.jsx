var React = require('react'),
    { StateStreamMixin } = require('rx-react'),

    globular = require('../globular'),
    debug = require('debug')('r3dm:components:connect'),

    ConnectActions = require('./Actions'),
    ConnectStore = require('./Store');

var Connect = React.createClass({
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
      name
    } = this.state.email;

    return (
      <div id = 'connect' className = 'connect'>
        <div className = 'connect_heading'>
          <h2>Work With Us.</h2>
        </div>

        <div className = 'connect_form'>
          <div>
            <form
              action = ''
              className = 'pure-form'
              onSubmit = { this.handleConnect }>
              <div className = 'connect_name'>
                  <input
                    type = 'text'
                    name = 'name'
                    className = 'connect_input'
                    value = { name }
                    onChange = { this._onNameChange }
                    placeholder = 'your name' />
              </div>
              <div className = 'connect_email'>
                <div>
                  <input
                    type = 'email'
                    name = 'email'
                    className = 'connect_input'
                    value = { email }
                    onChange = { this._onEmailChange }
                    placeholder = 'email'/>
                </div>
                <div
                  className = 'button'
                  onClick = { this._handleConnect }>
                  <span>
                    Connect
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Connect;
