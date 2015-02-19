var Rx = require('rx'),
    React = require('react'),
    tweenState = require('react-tween-state'),
    CSSTransitionGroup = React.addons.CSSTransitionGroup,
    debug = require('debug')('r3dm:components:connect'),
    globular = require('../globular'),

    // # mixins
    // PureRenderMixin = React.addons.PureRenderMixin,
    StateStreamMixin = require('../util/stateStreamMixin'),

    // # Components
    Sent = require('./ConnectSent'),
    ConnectError = require('./ConnectError'),

    // # flux
    ConnectActions = require('./Actions'),
    ConnectStore = require('./Store');

var Connect = React.createClass({

  mixins: [
    tweenState.Mixin,
    StateStreamMixin
  ],

  getStateStream: function() {
    debug('setting up state stream');
    return Rx.Observable.combineLatest(
      ConnectStore,
      this._initSize,
      this._clickPosition,
      function(state, initSize, clickPosition) {
        state.initSize = initSize;
        state.clickPosition = clickPosition;
        return state;
      }
    );
  },

  componentWillMount: function() {
    this.setState({ scale: 0 });
  },

  componentDidMount: function() {
    var connectForm = this.refs.form.getDOMNode(),
        rect = connectForm.getBoundingClientRect();

    // get users timezone
    ConnectActions.setUtc(new Date().getTimezoneOffset());

    this._initSize.onNext({
      height: connectForm.clientHeight,
      width: connectForm.clientWidth,
      left: rect.left,
      top: rect.top
    });
  },

  _onEmailChange: ConnectActions.onEmailChange,
  _onNameChange: ConnectActions.onNameChange,
  _initSize: new Rx.BehaviorSubject(false),
  _clickPosition: new Rx.BehaviorSubject({
    left: 0,
    top: 0
  }),

  _handleConnect: function(e) {
    var state = this.state,
        email = state.email,
        name = state.name,
        utc = state.utc,
        rectX = state.initSize.left,
        rectY = state.initSize.top,
        clientX = e.clientX,
        clientY = e.pageY;

    e.preventDefault();

    if (!email || !name) {
      return;
    }

    this._clickPosition.onNext({
      left: clientX - rectX,
      top: clientY - rectY
    });

    this.tweenState('scale', {
      easing: tweenState.easingTypes.easeInOutQuad,
      stackBehavior: tweenState.stackBehavior.DESTRUCTIVE,
      duration: 750,
      beginValue: 0,
      endValue: this.state.scale === 0 ? 1 : 0,
      onEnd: function() {
        debug('send connect action');
        ConnectActions.send({
          email: email,
          name: name,
          utc: utc
        });
      }
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
        height = state.initSize.height,
        scale = this.getTweeningValue('scale'),
        width = state.initSize.width;

    var style = {
      height: height + 'px'
    };

    var expandStyle = {
      height: width ? width * 2 : 0,
      left: state.clickPosition.left,
      marginLeft: -width,
      marginTop: -width,
      top: state.clickPosition.top,
      WebkitTransform: 'scaleX(' + scale + ') scaleY(' + scale + ')',
      webkitTransform: 'scaleX(' + scale + ') scaleY(' + scale + ')',
      transform: 'scaleX(' + scale + ') scaleY(' + scale + ')',
      width: width ? width * 2 : 0
    };

    var sendingView = (
      <article
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
      </article>
    );
    var sentView = (
      <Sent
        ref='sent'
        className='connect'
        style={ style }/>
    );
    var errorView = (
      <ConnectError
        ref='error'
        className='connect'
        style={ style } />
    );
    var formView = (
      <article
        className='connect'
        key='init'
        ref='form'>
        <header className='connect_heading'>
          <h2>Work With Us.</h2>
        </header>
        <div className='connect_form'>
          <form
            action=''
            className='pure-form'
            onSubmit={ this.handleConnect }>
            <div className='connect_name'>
                <input
                  type='text'
                  name='name'
                  className='connect_input'
                  value={ name }
                  onChange={ this._onNameChange }
                  placeholder='your name' />
            </div>
            <div className='connect_email'>
              <div>
                <input
                  type='email'
                  name='email'
                  className='connect_input'
                  value={ email }
                  onChange={ this._onEmailChange }
                  placeholder='email'/>
              </div>
              <div
                className='button'
                onClick={ this._handleConnect }>
                <span>
                  Connect
                </span>
              </div>
            </div>
          </form>
        </div>
        <div
          className='connect_form-button-expand'
          style={ expandStyle }></div>
      </article>
    );

    return (
      <section
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

module.exports = Connect;
