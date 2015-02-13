var React = require('react/addons'),
    tweenState = require('react-tween-state'),

    // # mixins
    StateStreamMixin = require('../util/stateStreamMixin'),

    // # components
    ImgLoader = require('react-imageloader'),
    Spinner = require('../common/Spinner'),
    WorkCopy = require('./WorkCopy'),

    // # flux
    AppStore = require('../app/Store');

var screenTrigger = '(max-width: 30em)';
var triggerImageAnimate = 450;
var Work = React.createClass({
  mixins: [
    tweenState.Mixin,
    StateStreamMixin
  ],

  getStateStream: function() {
    return AppStore
      .map(function(appState) {
        return {
          scrollTop: appState.scrollTop,
          isScrollingDown: appState.isScrollingDown
        };
      });
  },

  componentWillMount: function() {
    this.setState({ shpeArticleRight: -1000 });
  },

  componentDidMount: function() {
    var matchMedia = typeof window !== 'undefined' ? window.matchMedia : null;
    var shpeNode = this.refs.shpe.getDOMNode();

    this._mql = matchMedia(screenTrigger);
    this._mql.addListener(this._updateScreen);
    this._updateScreen();

    this.setState({ shpeArticleHeight: shpeNode.offsetTop });
  },

  componentWillUnmount: function() {
    this._mql.removeListener(this._updateScreen);
  },

  componentDidUpdate: function() {
    if (!this.state.shpeArticleTweened &&
        this.state.isScrollingDown &&
        this.state.scrollTop >
        (this.state.shpeArticleHeight - triggerImageAnimate)) {

      this.setState({ shpeArticleTweened: true });
      this.tweenState('shpeArticleRight', {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: 1000,
        endValue: 0
      });
    }
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

    var shpeArticleStyle = { right: this.getTweeningValue('shpeArticleRight') };

    return (
      <section className="work">
        <header className = "work_heading">
          <h2>Our Work</h2>
        </header>
        <div className = "work_content" >
          <article ref='shpe'>
            <WorkCopy imgFirst={ this.state.smallScreen }>
              <div className='work_copy'>
                <header>
                  <h3>SHPE</h3>
                  <p>San Francisco Bay Area</p>
                </header>
                <p>
                  We teamed up with the Society Of Hispanic Professional
                  Engineers - San Francisco Bay Area chapter to bring their
                  public face up-to-date with Node.js and MongoDb.
                  In the process, we were able to save this non-profit money in
                  the long-run by utilizing hosting plans available for small
                  companies using Node.js.
                </p>
              </div>
              <div className='work_img' style={ shpeArticleStyle }>
                <ImgLoader
                  src='images/mocks/ipad_iphone_portrait.png'
                  wrapper={ React.DOM.div }
                  preloader={ spinner }/>
              </div>
            </WorkCopy>
          </article>
        </div>
      </section>
    );
  }
});

module.exports = Work;
