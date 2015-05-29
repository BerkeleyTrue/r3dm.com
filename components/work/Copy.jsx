import React, { PropTypes } from 'react';
import ImgLoader from 'react-imageloader';

import { Switcher, Spinner } from '../common';

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

  shouldComponentUpdate(nextProps) {
    return this.props.title !== nextProps.title;
  }

  renderLinks(links) {
    return links.map(link => {
      return (
        <a
          className={ link.className }
          href={ link.href }
          key={ link.body }>
          { link.body }
          <i className={ link.iconClassName } />
        </a>
      );
    });
  }

  renderLinkBox(links) {
    if (!links || !links.length) {
      return null;
    }
    return (
      <div className='work_links'>
        { this.renderLinks(links) }
      </div>
    );
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
        <Switcher
          className='work_box'
          shouldSwitch={ shouldSwitch }>
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
            { this.renderLinkBox(links) }
          </div>
        </Switcher>
      </article>
    );
  }
}
