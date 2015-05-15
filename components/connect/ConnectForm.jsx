import React, { PropTypes } from 'react';
import { createContainer } from 'thundercats';
import tweenState from 'react-tween-state';
import debugFactory from 'debug';
import globular from '../globular';

const debug = debugFactory('r3dm:comp:connect:form');

export default createContainer(React.createClass({
  mixins: [tweenState.Mixin],
  displayName: 'ConnectForm',

  propTypes: {
    connectActions: PropTypes.object,
    email: PropTypes.string,
    name: PropTypes.string
  },

  getThundercats: function() {
    return {
      store: 'ConnectStore',
      map: ({ name, email }) => ({ email, name }),
      actions: ['connectActions']
    };
  },

  componentDidMount: function() {
    const form = this.refs.form.getDOMNode(),
        rect = form.getBoundingClientRect();

    this.setState({ // eslint-disable-line
      width: form.clientWidth,
      height: form.clientHeight,
      rectX: rect.left,
      rectY: rect.top
    });
  },

  handleConnect: function(e) {
    const clientX = e.clientX;
    const clientY = e.pageY;
    const {
      rectX,
      rectY
    } = this.state;

    const {
      email,
      name
    } = this.props;

    e.preventDefault();

    this.setState({
      leftClickPos: clientX - rectX,
      topClickPos: clientY - rectY
    });

    if (!email || !name) {
      return;
    }

    this.tweenState('scale', {
      easing: tweenState.easingTypes.easeInOutQuad,
      stackBehavior: tweenState.stackBehavior.DESTRUCTIVE,
      duration: 750,
      beginValue: 0,
      endValue: 1,
      onEnd: () => {
        debug('send connect action');
        this.props.connectActions.send({
          email: email,
          name: name,
          utc: new Date().getTimezoneOffset()
        });
      }
    });

    // submit event to Google Analytics to measure conversion goals
    globular.ga('send', 'event', 'button', 'click', 'Connect');
  },

  render: function() {
    const {
      connectActions,
      name,
      email
    } = this.props;
    const {
      height,
      width,
      leftClickPos,
      topClickPos,
    } = this.state;

    const scale = this.getTweeningValue('scale') || 0;

    var expandStyle = {
      height: width ? width * 2 : 0,
      left: leftClickPos || 0,
      marginLeft: -width,
      marginTop: -width,
      top: topClickPos || 0,
      WebkitTransform: 'scaleX(' + scale + ') scaleY(' + scale + ')',
      transform: 'scaleX(' + scale + ') scaleY(' + scale + ')',
      width: width ? width * 2 : 0
    };

    return (
      <article
        className='connect'
        key='form'
        ref='form'
        style={{ height: height }}>
        <header className='connect_heading'>
          <h2>CONNECT</h2>
        </header>
        <div className='connect_form'>
          <form
            action=''
            className='pure-form'
            onSubmit={ this.handleConnect }>
            <div className='connect_name'>
              <input
                className='connect_input'
                name='name'
                onChange={ connectActions.onNameChange }
                placeholder='your name'
                type='text'
                value={ name } />
            </div>
            <div className='connect_email'>
              <div>
                <input
                  className='connect_input'
                  name='email'
                  onChange={ connectActions.onEmailChange }
                  placeholder='email'
                  type='email'
                  value={ email } />
              </div>
              <div
                className='button'
                onClick={ this.handleConnect }>
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
  }
}));
