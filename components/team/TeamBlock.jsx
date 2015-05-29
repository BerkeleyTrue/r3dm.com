import React from 'react';

const iconMap = {
  github: 'github-alt',
  portfolio: 'desktop',
  linkedin: 'linkedin',
  email: 'envelope'
};

export default class extends React.Component {
  static displayName = 'Block'
  static propTypes = {
    className: React.PropTypes.string,
    data: React.PropTypes.object
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data.name !== nextProps.data.name;
  }

  renderLinks(links) {
    if (!links.lenght) {
      return null;
    }
    return links.map(function(link) {
      return [(
        <a href={ link.url }>
          <span className='fa-stack fa-lg'>
            <i className='fa fa-circle fa-stack-2x'></i>
            <i className={ 'fa fa-stack-1x fa-' + iconMap[link.type] } ></i>
          </span>
        </a>
      )];
    });
  }

  render() {
    const {
      copy,
      imgUrl,
      links,
      name
    } = this.props.data;

    return (
      <div className = { this.props.className }>
        <img src= { imgUrl } />
        <header><h3>{ name }</h3></header>
        <div><p>{ copy }</p></div>
        <div className='links-container'>
          { this.renderLinks(links) }
        </div>
      </div>
    );
  }
}
