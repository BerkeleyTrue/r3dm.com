import React from 'react';

import { createContainer } from 'thundercats';
import ImgLoader from 'react-imageloader';
import Spinner from '../common/Spinner.jsx';
import WorkCopy from './WorkShpeCopy.jsx';

var screenTrigger = '(max-width: 30em)';

@createContainer({
  store: 'appStore',
  map: ({ scrollTop, isScrollingDown }) => ({ isScrollingDown, scrollTop })
})
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { smallScreen: false };
  }
  static displayName = 'WorkShpe'

  componentDidMount() {
    const win = typeof window !== 'undefined' ? window : null;
    const matchMedia = win.matchMedia;

    this._mql = matchMedia(screenTrigger);
    this._mql.addListener(this._updateScreen);
    this.updateScreen(this._mql.matches, this.state.smallScreen);
  }

  componentWillUnmount() {
    this._mql.removeListener(this._updateScreen);
  }

  updateScreen(matches, smallScreen) {
    if (matches === smallScreen) {
      return;
    }
    this.setState({
      smallScreen: this._mql.matches
    });
  }

  render() {
    // create factory with props
    var spinner = React.createElement.bind(null, Spinner, {
      svgClass: 'connect_sending-spinner',
      circleClass: 'connect_sending-path'
    });

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
              href=
                'http://the.r3dm.com/blog/shpe-san-francisco-site-makeover'>
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
          <div className='work_img'>
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
}
