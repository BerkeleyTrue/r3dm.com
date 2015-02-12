var React = require('react/addons'),

    // # mixins
    PureRender = React.addons.PureRenderMixin,

    // # components
    ImgLoader = require('react-imageloader'),
    Spinner = require('../common/Spinner'),
    WorkCopy = require('./WorkCopy');

var screenTrigger = '(max-width: 30em)';

var Work = React.createClass({displayName: "Work",
  mixins: [PureRender],

  getInitialState: function() {
    return {
      smallScreen: false
    };
  },

  componentDidMount: function() {
    var matchMedia = typeof window !== 'undefined' ? window.matchMedia : null;

    this._mql = matchMedia(screenTrigger);
    this._mql.addListener(this._updateScreen);
    this._updateScreen();
  },

  componentWillUpdate: function() {
    this._mql.removeListener(this._updateScreen);
  },

  _updateScreen: function() {
    if (this._mql.matches === this.state.smallScreen) {
      return;
    }
    this.setState({
      smallScreen: this._mql.matches
    });
  },

  render: function() {

    // create factory with props
    var spinner = React.createElement.bind(null, Spinner, {
      svgClass: 'connect_sending-spinner',
      circleClass: 'connect_sending-path'
    });

    return (
      React.createElement("section", {className: "work"}, 
        React.createElement("header", {className: "work_heading"}, 
          React.createElement("h2", null, "Our Work")
        ), 
        React.createElement("div", {className: "work_content"}, 
          React.createElement("article", null, 
            React.createElement(WorkCopy, {imgFirst:  this.state.smallScreen}, 
              React.createElement("div", {className: "work_copy"}, 
                React.createElement("header", null, 
                  React.createElement("h3", null, "SHPE"), 
                  React.createElement("p", null, "San Francisco Bay Area")
                ), 
                React.createElement("p", null, 
                  "We teamed up with the Society Of Hispanic Professional" + ' ' +
                  "Engineers - San Francisco Bay Area chapter to bring their" + ' ' +
                  "public face up-to-date with Node.js and MongoDb." + ' ' +
                  "In the process, we were able to save this non-profit money in" + ' ' +
                  "the long-run by utilizing hosting plans available for small" + ' ' +
                  "companies using Node.js."
                )
              ), 
              React.createElement("div", {className: "work_img"}, 
                React.createElement(ImgLoader, {
                  src: "images/mocks/ipad_iphone_portrait.png", 
                  wrapper:  React.DOM.div, 
                  preloader: spinner })
              )
            )
          )
        )
      )
    );
  }
});

module.exports = Work;
