var React = require('react/addons'),
    tweenState = require('react-tween-state'),

    // # mixins
    StateStreamMixin = require('../util/stateStreamMixin'),

    // # components
    ImgLoader = require('react-imageloader'),
    Spinner = require('../common/Spinner.jsx'),
    WorkCopy = require('./WorkShpeCopy.jsx'),

    // # flux
    AppStore = require('../app/Store');

var screenTrigger = '(max-width: 30em)';

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
    this.setState({
      shpeArticleRight: 1000,
      shpeArticleTweened: false
    });
  },

  componentDidMount: function() {
    var win = typeof window !== 'undefined' ? window : null;
    var matchMedia = win.matchMedia;
    var shpeNode = this.refs.shpe.getDOMNode();

    this._mql = matchMedia(screenTrigger);
    this._mql.addListener(this._updateScreen);
    this._updateScreen();

    this.setState({
      viewPortHeight: win.innerHeight,
      shpeArticleHeight: shpeNode.offsetTop
    });
  },

  componentWillUnmount: function() {
    this._mql.removeListener(this._updateScreen);
  },

  shouldComponentUpdate: function() {
    return this.getTweeningValue('shpeArticleRight') !== 0;
  },

  componentDidUpdate: function() {
    var state = this.state,
        scrollTop = state.scrollTop,
        isScrollingDown = state.isScrollingDown,
        viewPortHeight = state.viewPortHeight,
        shpeArticleHeight = state.shpeArticleHeight;

    if (state.shpeArticleTweened) {
      return;
    }

    if (isScrollingDown &&
        scrollTop + viewPortHeight - 200 > shpeArticleHeight) {

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
    var translate = this.getTweeningValue('shpeArticleRight');

    // create factory with props
    var spinner = React.createElement.bind(null, Spinner, {
      svgClass: 'connect_sending-spinner',
      circleClass: 'connect_sending-path'
    });

    var shpeArticleStyle = {
      WebkitTransform: 'translateX(' + translate + 'px)',
      transform: 'translateX(' + translate + 'px)'
    };

    return (
      <section
        id='work'
        className='work'>
        <header className='work_heading'>
          <h2>RECENT WORK</h2>
        </header>
        <div className='work_content' >
          <article ref='shpe'>
            <WorkCopy imgFirst={ this.state.smallScreen }>
              <div className='work_copy'>
                <header>
                  <h3>SHPE Website</h3>
                </header>
                <p>
                  We teamed up with the Society of Hispanic Professional
                  Engineers of San Francisco to makover their public face.
                  We made the site mobile so visitors
                  could learn more about SHPE right from a smartphone.
                  In the process, we were able to save the non-profit money
                  by utilizing hosting plans available for small
                  businesses.
                </p>
                <a href="http://the.r3dm.com/blog/shpe-san-francisco-site-makeover"
                   className="case-study">
                  Read Case Study
                  <i className="fa fa-book"></i>
                </a>
                <a href="http://www.shpesfba.org/"
                   className="visit-work">
                  Visit the site
                  <i className="fa fa-sign-out"></i>
                </a>
              </div>
              <div className='work_img' style={ shpeArticleStyle }>
                <a href='http://shpesfba.org'>
                  <ImgLoader
                    src='images/mocks/ipad_iphone_portrait.png'
                    wrapper={ React.DOM.div }
                    preloader={ spinner }/>
                </a>
              </div>
            </WorkCopy>
          </article>
        </div>
      </section>
    );
  }
});

module.exports = Work;
