var Rx = require('rx'),
    React = require('react'),

  { StateStreamMixin } = require('rx-react'),

    globular = require('../globular'),
    debug = require('debug')('r3dm:components:connect'),

    ConnectActions = require('./Actions'),
    ConnectStore = require('./Store');

var {
    CSSTransitionGroup,
    PureRenderMixin
  } = React.addons;

var Sent = React.createClass({

  mixins: [PureRenderMixin],

  render: function() {
    return (
      <div
        style={ this.props.style }
        className={ this.props.className }
        key='sent'>
        <h1>Thanks!</h1>
        <p>You should see an email from us soon.</p>
      </div>
    );
  }
});

var Connect = React.createClass({

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
    var {
      email,
      name,
      sending,
      sent,
      error,
      height
    } = this.state;

    var style = {
      height: height + 'px'
    };

    var sendingView = (
      <div
        ref='sending'
        style={ style }
        className='connect connect_sending'
        key='sending'>
        <svg
          className="connect_sending-spinner"
          width="65px"
          height="65px"
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg">
          <circle
            className="connect_sending-path"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            cx="33"
            cy="33"
            r="30">
          </circle>
        </svg>
      </div>
    );
    var sentView = (
      <Sent
        ref='sent'
        className='connect'
        style={ style }/>
    );
    var errorView = (
      <span
        style={ style }
        className='connect connect-error'
        key='error'>Error</span>
    );
    var formView = (
      <div
        className='connect'
        key='init'
        ref='form'>
        <div className='connect_heading'>
          <h2>Work With Us.</h2>
        </div>
        <div className = 'connect_form'>
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
    );

    return (
      <div
        id='connect'
        style={ style }
        className='connect_container'>
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
          transitionName='connect_sending'>
          { sending ? sendingView : null }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          component='div'
          transitionName='connect_sending'>
          { error ? errorView : null }
        </CSSTransitionGroup>
      </div>
    );
  }
});

module.exports = Connect;
