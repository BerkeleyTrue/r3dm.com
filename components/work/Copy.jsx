import React, { PropTypes } from 'react';
import ImgLoader from 'react-imageloader';

import { Spinner } from '../common';
import { Switcher } from '../util';

const spinner = React.createElement.bind(null, Spinner, {
  svgClass: 'connect_sending-spinner',
  circleClass: 'connect_sending-path'
});

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  static displayName = 'WorkCopy'
  static propTypes = {
    body: PropTypes.string,
    imgSrc: PropTypes.string,
    links: PropTypes.array,
    shouldSwitch: PropTypes.bool,
    title: PropTypes.string,
    wrapperClass: PropTypes.string,
    wrapperProps: PropTypes.object
  }

  renderLinks(links) {
    if (!links) {
      return null;
    }
    return links.map(link => {
      return (
        <a
          className={ link.className }
          href={ link.href }
          key={ link.title }>
          { link.title }
          <i className={ link.iconClassName } />
        </a>
      );
    });
  }

  render() {
    const {
      body,
      imgSrc,
      links,
      shouldSwitch,
      title,
      wrapperClass,
      wrapperProps
    } = this.props;

    const WrapperClass = wrapperClass || 'div';

    return (
      <article>
        <Switcher shouldSwitch={ shouldSwitch }>
          <WrapperClass
            { ...wrapperProps }
            className='work_img-wrapper'>
            <ImgLoader
              className='work_img'
              preloader={ spinner }
              src={ imgSrc }
              wrapper={ React.DOM.div }/>
          </WrapperClass>
          <div className='work_copy'>
            <header>
              <h3>{ title }</h3>
            </header>
            <p>{ body }</p>
            { this.renderLinks(links) }
          </div>
        </Switcher>
      </article>
    );
  }
}
