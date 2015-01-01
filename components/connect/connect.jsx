var React = require('react'),
    globular = require('../globular'),
    debug = require('debug')('r3dm:connect'),
    connect = require('./connect.action'),
    routerhistory = require('../common/history.action');

var Connect = React.createClass({
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
                    onChange = { this.onNameChange }
                    placeholder = 'your name' />
              </div>
              <div className = 'connect_email'>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Connect;
