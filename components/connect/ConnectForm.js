var React = require('react'),
    tweenState = require('react-tween-state'),
    debug = require('debug')('r3dm:comp:connect:form'),
    globular = require('../globular'),

    StateStreamMixin = require('../util/stateStreamMixin'),

    // # flux
    ConnectActions = require('./Actions'),
    ConnectStore = require('./Store');

var Form = React.createClass({displayName: "Form",

  mixins: [
    tweenState.Mixin,
    StateStreamMixin
  ],

  getStateStream: function() {
    return ConnectStore;
  },

  componentDidMount: function() {
    var form = this.refs.form.getDOMNode(),
        rect = form.getBoundingClientRect();


    this.setState({
      width: form.clientWidth,
      height: form.clientHeight,
      rectX: rect.left,
      rectY: rect.top
    });
  },

  _handleConnect: function(e) {
    var state = this.state,
        email = state.email,
        name = state.name,
        rectX = state.rectX,
        rectY = state.rectY,
        clientX = e.clientX,
        clientY = e.pageY;

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
      onEnd: function() {
        debug('send connect action');
        ConnectActions.send({
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
    var state = this.state,
        email = state.email,
        name = state.name,
        height = state.height,
        width = state.width,
        leftClickPos = state.leftClickPos,
        topClickPos = state.topClickPos,
        scale = this.getTweeningValue('scale') || 0;

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
      React.createElement("article", {
        key: "form", 
        ref: "form", 
        className: "connect", 
        style: { height: height}}, 
        React.createElement("header", {className: "connect_heading"}, 
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
                  onChange:  ConnectActions.onNameChange, 
                  placeholder: "your name"})
            ), 
            React.createElement("div", {className: "connect_email"}, 
              React.createElement("div", null, 
                React.createElement("input", {
                  type: "email", 
                  name: "email", 
                  className: "connect_input", 
                  value: email, 
                  onChange:  ConnectActions.onEmailChange, 
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
        ), 
        React.createElement("div", {
          className: "connect_form-button-expand", 
          style: expandStyle })
      )
    );
  }
});

module.exports = Form;
