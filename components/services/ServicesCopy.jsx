import React from 'react';

export default class extends React.Component {
  static displayName = 'Copy'
  static defaultProps = {
    content: 'empty content',
    imgSrc: '',
    title: 'empty title'
  }
  static propTypes = {
    content: React.PropTypes.string,
    imgSrc: React.PropTypes.string,
    title: React.PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    return this.props.title !== nextProps.title;
  }

  render() {
    return (
      <article>
        <header>
          <img src={ this.props.imgSrc } />
          <h3>{ this.props.title }</h3>
        </header>
        <p>
          { this.props.content}
        </p>
      </article>
    );
  }
}
