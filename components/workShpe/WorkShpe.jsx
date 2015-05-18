import React from 'react';
import tweenState from 'react-tween-state';

import { createContainer } from 'thundercats';
import ImgLoader from 'react-imageloader';
import Spinner from '../common/Spinner.jsx';
import WorkCopy from './WorkShpeCopy.jsx';

var screenTrigger = '(max-width: 30em)';

export default createContainer(React.createClass({
  displayName: 'WorkShpe',
  mixins: [ tweenState.Mixin ],

  getThundercats: function() {
    return {
      store: 'appStore',
      map: ({ scrollTop, isScrollingDown }) => {
        return {
          isScrollingDown,
          scrollTop
        };
      }
    };
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

    this.setState({ // eslint-disable-line
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

      this.setState({ shpeArticleTweened: true }); // eslint-disable-line
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
      <article
        id='work_shpe_article'
        ref='shpe'>
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
              In the process, we were able to save them money
              by utilizing hosting plans available for small
              businesses.
            </p>
            <a
              className='case-study'
              href='http://the.r3dm.com/blog/shpe-san-francisco-site-makeover'>
              Read Case Study
              <i className='fa fa-book'></i>
            </a>
            <a
              className='visit-work'
              href='http://www.shpesfba.org/'>
              Visit the site
              <i className='fa fa-sign-out'></i>
            </a>
          </div>
          <div className='work_img' style={ shpeArticleStyle }>
            <a href='http://shpesfba.org'>
              <ImgLoader
                preloader={ spinner }
                src='images/mocks/ipad_iphone_portrait.png'
                wrapper={ React.DOM.div }/>
            </a>
          </div>
        </WorkCopy>
      </article>
    );
  }
}));
